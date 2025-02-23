const GamesSearchList = require("../models/gamelist-model");
const Developers = require("../models/developer-model");
const Publishers = require("../models/publisher-model");
const Platforms = require("../models/platform-model");
const Games = require("../models/game-model");
const gamesSearchItemDto = require("../dtos/gamesSearchItem-dto");
const GameDto = require("../dtos/game-dto");

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

  async saveGameDetails(apiResponse) {
    const { results: rawList } = apiResponse;
    const game = new GameDto(rawList);
    const { id, developers, publishers, platforms } = game;

    const storedResult = await Games.findOne({ id }).populate('developers').populate('publishers').populate('platforms');

    if (!storedResult) {
      const devObjIds = await Promise.all(
        developers.map(async (dev) => {
          const existingDev = await Developers.findOne({ url: dev?.url });
          if (existingDev) {
            return existingDev._id;
          }
          const newDev = await Developers.create(dev);
          return newDev._id;
        })
      );

      const pubObjIds = await Promise.all(
        publishers.map(async (pub) => {
          const existingPub = await Publishers.findOne({ url: pub?.url });
          if (existingPub) {
            return existingPub._id;
          }
          const newPub = await Publishers.create(pub);
          return newPub._id;
        })
      );

      const platObjIds = await Promise.all(
        platforms.map(async (plat) => {
          const existingPlat = await Platforms.findOne({ url: plat?.url });
          if (existingPlat) {
            return existingPlat._id;
          }
          const newPlat = await Platforms.create(plat);
          return newPlat._id;
        })
      );

      const newGame = new Games({
        ...game,
        developers: devObjIds,
        publishers: pubObjIds,
        platforms: platObjIds,
      });

      await newGame.save();
      return await Games.findOne({ id }).populate('developers').populate('publishers').populate('platforms');;
    }

    return storedResult;
  }
}

module.exports = new GameService();
