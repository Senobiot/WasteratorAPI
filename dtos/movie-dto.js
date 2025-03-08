module.exports = class MovieDto {
  constructor({ inCollectionUsers, _id, ...rest }) {
    Object.assign(this, rest);
  }
};
