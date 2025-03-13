const UserModel = require("../models/users-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");
const JwtFields = require("../dtos/user-jwt-fields");
const ApiErrors = require("../exceptions/exceptions");

class UserService {
  async registartion(props) {
    const { email } = props;
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      throw ApiErrors.BadRequest(`Пользователь с адресом ${email} уже есть`);
    }
    const { password } = props;
    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const newUser = await UserModel.create({
      ...props,
      password: hashedPassword,
      activationLink,
    });

    await mailService.sendActimationMail(
      email,
      `${process.env.API_URL}/auth/activate/${activationLink}`
    );
    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async login(email, password) {
    const existUser = await UserModel.findOne({ email });
    if (!existUser) {
      throw ApiErrors.BadRequest(`Пользователь с email ${email} не найден`);
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existUser.password
    );
    {
      if (!isPasswordCorrect) {
        throw ApiErrors.BadRequest("Неверный пароль");
      }
    }
    const userDto = new UserDto(existUser);
    const jwtFields = new JwtFields(userDto);
    const tokens = tokenService.generateTokens({ ...jwtFields });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async logout(refreshToken) {
    const token = tokenService.removeToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiErrors.UnauthorizedError();
    }

    const validatedToken = tokenService.validateRefreshToken(refreshToken);
    const storedToken = await tokenService.searchToken(refreshToken);

    if (!validatedToken || !storedToken) {
      throw ApiErrors.UnauthorizedError();
    }

    const updatedUser = await UserModel.findById(validatedToken.id);
    const userDto = new UserDto(updatedUser);
    const jwtFields = new JwtFields(userDto);
    const tokens = tokenService.generateTokens({ ...jwtFields });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink) {
    const existUser = await UserModel.findOne({ activationLink });
    if (!existUser) {
      throw ApiErrors.BadRequest("Activation link is not valid");
    }
    existUser.hasActivated = true;
    await existUser.save();
  }

  async getAllUsers() {
    const users = await UserModel.find();
    return users;
  }

  async setAvatar(req) {
    try {
      const {
        user: { id: userId },
      } = req.body;

      const user = await UserModel.findById(userId);

      user.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        fileName: req.file.originalname,
      };
      await user.save();

      return new UserDto(user);
    } catch (error) {
      throw ApiErrors.BadRequest("Error saving avatar");
    }
  }
}

module.exports = new UserService();
