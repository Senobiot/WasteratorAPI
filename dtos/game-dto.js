module.exports = class GameDto {
  constructor({
    inCollectionUsers,
    _id,
    developers,
    platforms,
    publishers,
    ...rest
  }) {
    Object.assign(this, rest);
    this.platforms = platforms.map((e) => e.name);
    this.publishers = publishers.map((e) => e.name);
    this.developers = developers.map((e) => e.name);
  }
};
