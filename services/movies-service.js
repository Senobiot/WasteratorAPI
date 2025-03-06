const MovieListDto = require("../dtos/movie-list-dto");
const { MoviesSearchList } = require("../models/movie-search-list-model");
const Users = require("../models/users-model");

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

  async saveSearchList(searchQuery, apiResponse, userId) {
    const list = apiResponse.docs.map((item) => new MovieListDto(item));
    const newSearchList = await MoviesSearchList.create({ searchQuery, list });
    return this.markInCollectionItems(userId, newSearchList.list);
  }
}

module.exports = new MoviesService();
