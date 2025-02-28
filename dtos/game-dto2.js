module.exports = class GameDtoDb {
  constructor(data = {}) {
    this.developers = data.developers?.map((dev) => ({
      name: dev.name,
      id: dev.id,
    }));
    this.description = data.description_raw;
    this.descriptionHtml = data.description;
    this.genres = data.genres?.map((genre) => genre.name);
    this.id = data.id;
    this.imageUrl = data.background_image;
    this.inCollection = false;
    this.name = data.name;
    this.platforms = data.platforms?.map((platform) => ({
      name: platform?.platform?.name,
      id: platform?.platform?.id,
    }));
    this.publishers = data.publishers?.map((pub) => {
      pub.name, pub.id;
    });
    this.ratingMpaa = data.esrb_rating?.name;
    this.ratingMetacritic = data.metacritic;
    this.ratingTop = data.rating_top;
    this.release = data.released;
  }
};
