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

  set getListByName(name = "") {
    this.name = name;

    return (
      `${this.URL}${this.REQUEST.search}` +
      `?api_key=${process.env.GAME_API_KEY}` +
      `&format=${this.FORMAT}` +
      `&resources=${this.request.game}` +
      `&query=${this.name}`
    );
  },

  set getGameDetails(url = "") {
    this.detailsUrl = url;

    return `${this.detailsUrl}?api_key=${process.env.GAME_API_KEY}&format=${this.FORMAT}`;
  },
};

class GamesController {
  async getListByName(req, res, next) {
    try {
      const response = await fetch(requestSettings.getListByName(req.body));
      const data = await response.json(data);
      const searchList = await gameService.saveSearchList(data);

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
