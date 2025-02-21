const gameService = require("../services/games-service");

const requestSettings = {
  url: "https://www.giantbomb.com/api/",
  format: "json",
  request: {
    game: "game",
    search: "search",
  },
  name: "",
  detailsUrl: "",

  getListByName(name = "") {
    this.name = name;

    return (
      `${this.url}${this.request.search}` +
      `?api_key=${process.env.GAME_API_KEY}` +
      `&format=${this.format}` +
      `&resources=${this.request.game}` +
      `&query=${this.name}`
    );
  },

  getGameDetails(url = "") {
    this.detailsUrl = url;

    return `${this.detailsUrl}?api_key=${process.env.GAME_API_KEY}&format=${this.format}`;
  },
};

class GamesController {
  async searchGame(req, res, next) {
      const request = req.query.name;

    try {
      const response = await fetch(requestSettings.getListByName(request));
      const data = await response.json();
      const searchList = await gameService.saveSearchList(request, data);
      console.log(searchList);
      return res.json(searchList);
    } catch (error) {
      next(error);
    }
  }

  async getDetails() {
    try {
      const response = await fetch(req, res, next);
      const data = await response.json(
        requestSettings.getGameDetails(req.body)
      );
      const gameDetails = await gameService.saveGameDetails(data);

      return res.json(gameDetails);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new GamesController();
