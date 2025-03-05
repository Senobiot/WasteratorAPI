module.exports = class AllGamesListDto {
  constructor(data = {}) {
    this.imageUrl = data.background_image?.replace(
      /media\/(games|screenshots)/,
      "media/crop/600/400/$1"
    );
    this.genres = data.genres?.map((genre) => genre.name);
    this.id = data.id;
    this.platforms = data.platforms?.map((platform) => platform.platform?.name);
    this.rating = data.rating;
    this.ratingMetacritic = data.metacritic;
    this.ratingTop = data.rating_top;
    this.release = data.released;
    this.screenshots = data.short_screenshots?.map((e) => e.image);
    this.stores = data.stores?.map((e) => e.store?.name);
    this.name = data.name;
    this.inCollection = false;
  }
};
