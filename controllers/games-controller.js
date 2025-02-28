const gameService = require("../services/games-service");

const requestSettings = {
  url: "https://www.giantbomb.com/api/",
  urlRawg: "https://api.rawg.io/api/games",
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

  getTopList() {
    return `${this.urlRawg}?key=${process.env.GAME_API_RAWG_KEY}&page=2`;
  },

  getGameDetails(url = "") {
    this.detailsUrl = url;

    return `${this.detailsUrl}?api_key=${process.env.GAME_API_KEY}&format=${this.format}`;
  },

  getGameDetailsById(id) {
    return `${this.urlRawg}/${id}?key=${process.env.GAME_API_RAWG_KEY}&page=2`;
  },
};

class GamesController {
  async searchGame(req, res, next) {
    const request = req.query.name;
    const userId = req.body.user.id;

    try {
      const storedList = await gameService.checkStoredSearchList(
        request,
        userId
      );

      if (storedList) {
        return res.json(storedList);
      }

      const response = await fetch(requestSettings.getListByName(request));
      const data = await response.json();
      const searchList = await gameService.saveSearchList(
        request,
        data,
        userId
      );

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

  async getDetailsById(req, res, next) {
    const userId = req.body.user.id;
    const { gameId } = req.body;
    console.log(gameId);

    try {
      const storedGame = await gameService.checkStoredGameDetails(gameId, userId);

      if (storedGame) {
        console.log('stored');
        return res.json(storedGame);
      }

      const response = await fetch(requestSettings.getGameDetailsById(gameId));
      const data = await response.json();
      const gameDetails = await gameService.saveGameDetails(data);

      return res.json(gameDetails);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getAllGames(req, res, next) {
    const page = req.query.page || 1;
    const request = `${requestSettings.urlRawg}?key=${process.env.GAME_API_RAWG_KEY}&page=${page}`;

    try {
      const storedPage = await gameService.checkStoredAllGamesListPage(page);
      if (storedPage) {
        return res.json(storedPage.list);
      }

      const response = await fetch(request);
      const data = await response.json();
      const allGamesListPage = await gameService.saveAllGamesListPage(page, data);
      return res.json(allGamesListPage.list);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new GamesController();
