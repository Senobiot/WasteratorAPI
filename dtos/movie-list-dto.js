module.exports = class MovieListDto {
  constructor(data = {}) {
    this.countries = data.countries?.map((e) => e.name);
    this.genres = data.genres?.map((genre) => genre.name);
    this.id = data.id;
    this.imageUrl = data.poster?.previewUrl;
    this.inCollection = false;
    this.isSeries = data.isSeries;
    this.length = data.movieLength;
    this.name = data.name || data.alternativeName;
    this.originalName = data.alternativeName || data.enName;
    this.release = data.year;
    this.ratingImdb = data.rating?.imdb;
    this.ratingKp = data.rating?.kp;
  }
};
