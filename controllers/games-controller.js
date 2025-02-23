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
      const userId = req.body.user.id;

    try {
      const storedList = await gameService.checkStoredSearchList(request, userId);

      if (storedList) {
        return res.json(storedList);
      }

      const response = await fetch(requestSettings.getListByName(request));
      const data = await response.json();
      const searchList = await gameService.saveSearchList(request, data, userId);
  
      return res.json(searchList);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getDetails(req, res, next) {
    const url = req.query.url;
    const userId = req.body.user.id;

    try {
      const storedGame = await gameService.checkStoredGame(url, userId);

      if (storedGame) {
        return res.json(storedGame);
      }

      const response = await fetch(requestSettings.getGameDetails(url));
      const data = await response.json();
      const gameDetails = await gameService.saveGameDetails(data);

      return res.json(gameDetails);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new GamesController();
