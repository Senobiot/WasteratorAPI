const GamesSearchList = require("../models/gamelist-model");
const gamesSearchItemDto = require("../dtos/gamesSearchItem-dto");

class GameService {
  async saveSearchList(searchQuery, apiResponse) {
    const storedResult = await GamesSearchList.findOne({ searchQuery });

    if (!storedResult) {
      const { results: rawList } = apiResponse;
      const list = rawList.map((item) => new gamesSearchItemDto(item));

      await GamesSearchList.create({ searchQuery, list });
      return list;
    }

    return storedResult.list;
  }
}

module.exports = new GameService();
