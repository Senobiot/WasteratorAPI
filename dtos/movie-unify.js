module.exports = class MovieDto {
  constructor(data = {}) {
    this.actors = data.persons;
    this.originalName = data.alternativeName || data.enName;
    this.backgroundUrl = data.backdrop?.url;
    this.budget = data.budget;
    this.countries = data.countries?.map((e) => e.name);
    this.description = data.description;
    this.fees = Object.entries(data.fees || {})
      .filter((e) => e[1]?.value)
      .map((e) => [e[0], e[1].value, e[1].currency]);
    this.genres = data.genres?.map((e) => e.name);
    this.id = data.id;
    this.imageUrl = data.poster?.previewUrl;
    this.isInCollection = data.isInCollection;
    this.isSeries = data.isSeries;
    this.length = data.movieLength;
    this.logoUrl = data.logo?.url;
    this.posterUrl = data.poster?.url;
    this.rating = Object.entries(data.rating || {}).filter((e) => e[1]);
    this.ratingMpaa = data.ratingMpaa;
    this.seasonsInfo = data.seasonsInfo;
    this.seriesLength = data.seriesLength;
    this.name = data.name;
    this.top250 = data.top250;
    this.trailers = data.videos?.trailers?.map((e) => e.url);
    this.votesImdb = data.votes?.imdb;
    this.votesKp = data.votes?.kp;
    this.year = data.year;
    this.watchability = data.watchability?.items;
  }
};
