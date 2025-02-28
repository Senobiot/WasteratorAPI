const GamesSearchList = require("../models/gamelist-model");
const Developers = require("../models/developer-model");
const Publishers = require("../models/publisher-model");
const Platforms = require("../models/platform-model");
const Games = require("../models/game-model");
const AllGamesList = require("../models/all-games-model");
const gamesSearchItemDto = require("../dtos/gamesSearchItem-dto");
const GameDto = require("../dtos/game-dto");
const GameDto2 = require("../dtos/game-dto2");
const AllGamesListDto = require("../dtos/all-games-dto");
const dbFileds = "-_id-__v"

class GameService {
  async markInCollectionItems(userId, searchResult) {
    const list = (
      await Games.find({ inCollectionUsers: userId }).select("id")
    ).reduce((acc, game) => {
      acc[game.id] = true;
      return acc;
    }, {});

    return searchResult.list.map((e) => {
      e.inCollection = e.id in list;
      return e;
    });
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
    const list = apiResponse.results.map(
      (item) => new gamesSearchItemDto(item)
    );
    const newSearchList = await GamesSearchList.create({ searchQuery, list });
    return this.markInCollectionItems(userId, newSearchList);
  }

  async checkStoredGame(detailsUrl, userId) {
    // const storedResult = await await this.populateGameDetails(
    //   Games.findOne({ detailsUrl })
    // );
    // if (storedResult) {
    //   const isInCollection = storedResult.inCollectionUsers.some(
    //     (e) => e.toString() === userId
    //   );
    //   const { inCollectionUsers, _id, ...result } = storedResult;
    //   return { ...result, inCollection: isInCollection };
    // }
    // return storedResult;
  }

  async checkStoredGameDetails(id, userId) {
    const storedResult = await this.populateGameDetails(
      Games.findOne({ id })
    );
    if (storedResult) {
      const isInCollection = storedResult.inCollectionUsers.some(
        (e) => e.toString() === userId
      );
      const { inCollectionUsers, _id, ...result } = storedResult;
      return { ...result, inCollection: isInCollection };
    }

    return storedResult;
  }

  async saveGameDetails(apiResponse) { 
    const game = new GameDto2(apiResponse);
    const { id, developers, publishers, platforms } = game;

    const devObjIds = await this.insertToCollection(developers, Developers);
    const pubObjIds = await this.insertToCollection(publishers, Publishers);
    const platObjIds = await this.insertToCollection(platforms, Platforms);

    const newGame = new Games({
      ...game,
      developers: devObjIds,
      publishers: pubObjIds,
      platforms: platObjIds,
    });


    await newGame.save();
    const { inCollectionUsers, _id, ...result } =
      await this.populateGameDetails(Games.findOne({ id }));

    return result;
  }

  async checkStoredAllGamesListPage(page) {
    return AllGamesList.findOne({ page }).select(dbFileds);
  }

  async saveAllGamesListPage(page, data) {
    const list = data.results.map((e) => new AllGamesListDto(e));
    return AllGamesList.create({ page, list });
  }

  async insertToCollection(array, collection) {
    console.log(array);
    if (!array || !array.length) return [];
    return Promise.all(
      array.map(async (e) => {
        const existItem = await collection.findOne({ id: e?.id });
        return existItem ? existItem._id : (await collection.create(e))._id;
      })
    );
  }

  async populateGameDetails(query) {
    return query
      .populate({ path: "developers", select: dbFileds})
      .populate({ path: "publishers", select: dbFileds})
      .populate({ path: "platforms", select: dbFileds})
      .lean();
  }
}

module.exports = new GameService();
