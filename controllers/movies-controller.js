const moviesService = require("../services/movies-service");

const requestSettings = {
  url: "https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=40&query=",

  getListByName(name = "") {
    return this.url + name;
  },

  get options() {
    return {
      method: "GET",
      withCredentials: true,
      headers: {
        "X-API-KEY": process.env.MOVIE_API_KEY,
        "Content-Type": "application/json",
      },
    };
  },
};

class MoviesController {
  async searchMovie(req, res, next) {
    const searchRequest = req.query.name;
    const userId = req.body.user.id;

    try {
      const storedList = await moviesService.checkStoredSearchList(
        searchRequest,
        userId
      );

      if (storedList) {
        return res.json(storedList);
      }

      const response = await fetch(
        requestSettings.getListByName(searchRequest),
        requestSettings.options
      );

      const data = await response.json();
      const searchList = await moviesService.saveSearchList(
        searchRequest,
        data,
        userId
      );

      return res.json(searchList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new MoviesController();
