const UserModel = require("../models/users-model");
const bcrypt = require("bcrypt");
const uuid = require("uuid");
const mailService = require("./mail-service");
const tokenService = require("./token-service");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registartion(email, password) {
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      throw new Error(`Пользователь с адресом ${email} уже есть`);
    }

    const hashedPassword = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();
    const newUser = await UserModel.create({
      email,
      password: hashedPassword,
      activationLink,
    });

    await mailService.sendActimationMail(email, `${process.env.API_URL}/auth/activate/${activationLink}`);
    const userDto = new UserDto(newUser);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  }

  async activate(activationLink){
    const existUser = await UserModel.findOne({activationLink});
    if (!existUser) {
      throw new Error("???");
    }
    existUser.hasActivated = true;
    await existUser.save();
  }

}

module.exports = new UserService();
