module.exports = class GameDto {
  constructor({ inCollectionUsers, _id, ...rest }) {
    Object.assign(this, rest);
  }
};
