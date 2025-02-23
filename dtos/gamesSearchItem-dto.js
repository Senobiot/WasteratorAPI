module.exports = class gamesSearchItemDto {
  constructor(data = {}) {
    this.detailsUrl = data.api_detail_url;
    this.release =
      data.original_release_date || data.date_added || data.date_last_updated;
    this.name = data.name;
    this.id = data.id;
    this.logoUrl = data.image?.icon_url;
    this.inCollection = false;
  }
}

