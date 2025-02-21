export default class MovieDto {
    constructor(data = {}) {
      this.actors = data.persons;
      this.alternativeName = data.alternativeName;
      this.backgroundImageUrl = data.backdrop?.url;
      this.budget = data.budget;
      this.countries = data.countries?.map( e => e.name);
      this.description = data.description;
      this.fees = Object.entries(data.fees || {}).filter( e => e[1]?.value);
      this.genres = data.genres?.map(e => e.name);
      this.id = data.id;
      this.isInCollection = data.isInCollection;
      this.isSeries = data.isSeries;
      this.length = data.movieLength;
      this.logoUrl = data.logo?.url;
      this.posterUrl = data.poster?.url;
      this.rating = Object.entries(data.rating || {}).filter(e => e[1]);
      this.ratingMpaa = data.ratingMpaa;
      this.seriesCount = data.seasonsInfo?.find( e => e.number === 0)?.episodesCount;
      this.seriesLength = data.seriesLength;
      this.title = data.name;
      this.top250 = data.top250;
      this.trailers = data.videos?.trailers?.map( e => e.url);
      this.type = data.type;
      this.votes = Object.entries(data.votes || {}).filter(e => e[1]);
      this.year = data.year;
    }
  }  
  