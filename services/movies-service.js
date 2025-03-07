const MovieListDto = require("../dtos/movie-list-dto");
const MovieDto = require("../dtos/movie-dto");
const MovieUnify = require("../dtos/movie-unify");
const { MoviesSearchList } = require("../models/movie-search-list-model");
const Users = require("../models/users-model");
const Movies = require("../models/movie-model");
const Actors = require("../models/actor-model");

class MoviesService {
  async markInCollectionItems(userId, searchResult) {
    const currUserMoviesCollectionIds = (await Users.findById(userId))
      .moviesCollection.ids;
    return searchResult.map((e) => {
      e.inCollection = currUserMoviesCollectionIds.includes(e.id);
      return e;
    });
  }

  async checkStoredSearchList(searchQuery, userId) {
    const storedResult = await MoviesSearchList.findOne({ searchQuery });

    if (storedResult) {
      const result = this.markInCollectionItems(userId, storedResult.list);
      return result;
    }
    return storedResult;
  }

  async checkStoredMove(id) {
    const storedResult = await Movies.findOne({ id })
      .populate({
        path: "actors",
        select: "-_id",
      })
      .lean();

    if (storedResult) {
      const isInCollection = storedResult.inCollectionUsers.some(
        (e) => e.toString() === userId
      );

      // const time = await collectionService.setGameTime(userId, id);

      // if (time) {
      //   storedResult.playedTime = time;
      // }
      storedResult.inCollection = isInCollection;

      return new MovieDto(storedResult);
    }

    return storedResult;
  }

  async saveSearchList(searchQuery, apiResponse, userId) {
    const list = apiResponse.docs.map((item) => new MovieListDto(item));
    const newSearchList = await MoviesSearchList.create({ searchQuery, list });
    return this.markInCollectionItems(userId, newSearchList.list);
  }

  async saveMovieDetails(apiResponse) {
    const movie = new MovieUnify(apiResponse);
    const { actors, id } = movie;

    const actorsObjIds = await this.insertToCollection(actors, Actors);

    const newMovie = new Movies({
      ...movie,
      actors: actorsObjIds,
    });
    await newMovie.save();
    const populateddetails = await Movies.findOne({ id })
      .populate({
        path: "actors",
        select: "-_id",
      })
      .lean();

    return new MovieDto(populateddetails);
  }

  async insertToCollection(array, collection) {
    if (!array || !array.length) return [];
    return Promise.all(
      array.map(async (e) => {
        const { id } = e;
        const existItem = await collection.findOne({ id });
        return existItem ? existItem._id : (await collection.create(e))._id;
      })
    );
  }
}

module.exports = new MoviesService();
