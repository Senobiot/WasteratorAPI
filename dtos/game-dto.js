module.exports = class GameDto {
  constructor(data = {}) {
    this.developers = data.developers?.map((dev) => ({
      name: dev.name,
      url: dev.api_detail_url,
    }));
    this.description = data.deck;
    this.descriptionHtml = data.description;
    this.detailsUrl = data.api_detail_url;
    this.genres = data.genres?.map((genre) => genre.name);
    this.id = data.id;
    this.imageUrl = data.image?.original_url;
    this.inCollection = false;
    this.name = data.name;
    this.platforms = data.platforms?.map((platform) => ({
      name: platform.name,
      url: platform.api_detail_url,
    }));
    this.publishers = data.publishers?.map((pub) => ({
      name: pub.name,
      url: pub.api_detail_url
    }));
    this.ratingMpaa = data.original_game_rating?.map((rating) => rating.name);
    this.release =
      data.original_release_date || data.date_added || data.date_last_updated;
    this.screenshots = data.images?.map((img) => img.original);
  }
};
