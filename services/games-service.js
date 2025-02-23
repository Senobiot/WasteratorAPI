const GamesSearchList = require("../models/gamelist-model");
const Developers = require("../models/developer-model");
const Publishers = require("../models/publisher-model");
const Platforms = require("../models/platform-model");
const Games = require("../models/game-model");
const gamesSearchItemDto = require("../dtos/gamesSearchItem-dto");
const GameDto = require("../dtos/game-dto");

class GameService {
  async markInCollectionItems(userId, searchResult) {
    const list = (
      await Games.find({ inCollectionUsers: userId }).select("id")
    ).map((e) => e.id);

    const result = searchResult.list.map((e) => {
      if (list.includes(e.id)) {
        e.inCollection = true;
      }

      return e;
    });

    return result;
  }

  async checkStoredSearchList(searchQuery, userId) {
    const storedResult = await GamesSearchList.findOne({ searchQuery });

    if (storedResult) {
      const result = await this.markInCollectionItems(userId, storedResult);

      return result;
    }

    return storedResult;
  }

  async saveSearchList(searchQuery, apiResponse, userId) {
    const { results: rawList } = apiResponse;
    const list = rawList.map((item) => new gamesSearchItemDto(item));

    const newSearchList = await GamesSearchList.create({ searchQuery, list });
    const result = await this.markInCollectionItems(userId, newSearchList);

    return result;
  }

  async checkStoredGame(detailsUrl, userId) {
    const storedResult = await Games.findOne({ detailsUrl })
      .populate("developers")
      .populate("publishers")
      .populate("platforms")
      .lean();
    if (storedResult) {
      const isInCollection = storedResult.inCollectionUsers.find(
        (e) => e.toString() === userId
      );
      const { inCollectionUsers, _id, ...result } = storedResult;
      result.inCollection = Boolean(isInCollection);

      return result;
    }
    return storedResult;
  }

  async saveGameDetails(apiResponse) {
    const { results: rawList } = apiResponse;
    const game = new GameDto(rawList);
    const { id, developers, publishers, platforms } = game;

    const insertToCollection = async (array, collection) => {
      if (!array || !array.length) {
        return [];
      }

      const result = await Promise.all(
        array.map(async (e) => {
          const existItem = await collection.findOne({ url: e.url });
          if (existItem) {
            return existItem._id;
          }
          const newItem = await collection.create(e);
          return newItem._id;
        })
      );

      return result;
    }

    const devObjIds = await insertToCollection(developers, Developers); 
    const pubObjIds = await insertToCollection(publishers, Publishers); 
    const platObjIds = await insertToCollection(platforms, Platforms); 

    const newGame = new Games({
      ...game,
      developers: devObjIds,
      publishers: pubObjIds,
      platforms: platObjIds,
    });

    await newGame.save();
    const { inCollectionUsers, _id, ...result } = await Games.findOne({ id })
      .populate("developers")
      .populate("publishers")
      .populate("platforms")
      .lean();

    return result;
  }
}

module.exports = new GameService();
