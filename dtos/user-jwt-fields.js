module.exports = class UserDto {
  constructor(model) {
    this.name = model.name;
    this.email = model.email;
    this.id = model.id;
  }
};
