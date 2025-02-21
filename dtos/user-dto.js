module.exports = class UserDto {
    constructor(model) {
        this.name = model.name;
        this.lastName = model.lastName;
        this.birthday = model.birthday;
        this.gender = model.gender;
        this.email = model.email;
        this.phone = model.phone;
        this.id = model._id;
        this.hasActivated = model.hasActivated ? 'Yes' : 'Not activated';
    }
}
