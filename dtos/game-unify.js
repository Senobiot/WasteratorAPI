module.exports = class GameUnify {
  constructor(data = {}) {
    this.developers = data.developers?.map((dev) => dev.name);
    this.description = data.description_raw;
    this.descriptionHtml = data.description;
    this.genres = data.genres?.map((genre) => genre.name);
    this.id = data.id;
    this.imageUrl = data.background_image.replace(
      /media\/(games|screenshots)/,
      "media/crop/600/400/$1"
    );
    this.inCollection = false;
    this.name = data.name;
    this.platforms = data.platforms?.map((platform) => platform.platform?.name);
    this.publishers = data.publishers?.map((pub) => pub.name);
    this.ratingMpaa = data.esrb_rating?.name;
    this.ratingMetacritic = data.metacritic;
    this.ratingTop = data.rating_top;
    this.release = data.released;
    this.stores = data.stores?.map((e) => e.store?.name);
    this.screenshots = data.short_screenshots?.map((e) => e.image);
  }
};
