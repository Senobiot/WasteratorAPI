const MoviesCollection = require("../models/movie-model");
const ActorsCollection = require("../models/actor-model");
const Games = require("../models/game-model");
const Users = require("../models/users-model");
const ApiErrors = require("../exceptions/exceptions");
const GameDto = require("../dtos/game-dto");

class CollectionService {
  async saveCollectable(props) {
    const { user, data } = props;
    const { id } = data;
    const { id: userId } = user;

    if (data.type === "game") {
      // TODO refactor it completely
      const collectionGame = await Games.findOne({ id })
        .populate("developers")
        .populate("publishers")
        .populate("platforms");
      collectionGame.inCollectionUsers.push(userId);

      const user = await Users.findById(userId);

      user.gamesCollection.list.push({ game: collectionGame._id });
      user.gamesCollection.ids.push(id);

      await Promise.all([user.save(), collectionGame.save()]);

      collectionGame.inCollection = true;
      console.log(collectionGame);
      return new GameDto(collectionGame.toObject());
    }

    if (data.type === "movie") {
      const collectionMovie = await MoviesCollection.findOne({ id });
      if (!collectionMovie) {
        data.inCollectionUsers = [userId];
        try {
          await ActorsCollection.insertMany(data.actors, { ordered: false });
        } catch (error) {
          if (error.code !== 11000) {
            console.log(error);
          }
        }

        const storedActors = await ActorsCollection.find();
        const filmActorsObjectIds = storedActors
          .filter((actor) => data.actors.find((e) => e.id === actor.id))
          .map((e) => e._id);
        const newCollectionMovie = await MoviesCollection.create({
          ...data,
          actors: filmActorsObjectIds,
        });
        await newCollectionMovie.save();
        return newCollectionMovie;
      } else {
        if (collectionMovie.inCollectionUsers.includes(userId)) {
          throw ApiErrors.CollectionError("Уже в коллекции");
        }

        collectionMovie.inCollectionUsers.push(id);
        await collectionMovie.save();
        return collectionMovie;
      }
    }
  }

  async deleteCollectable(props) {
    const { user, data } = props;
    const { id } = data;
    const { id: userId } = user;

    if (data.type === "game") {
      const collectionGame = await Games.findOne({ id })
        .populate("developers")
        .populate("publishers")
        .populate("platforms");
      collectionGame.inCollectionUsers =
        collectionGame.inCollectionUsers.filter((e) => e.toString() !== userId);
      collectionGame.inCollection = false;
      const user = await Users.findById(userId);

      user.gamesCollection.list = user.gamesCollection.list.filter(
        (e) => e.game.toString() !== collectionGame._id.toString()
      );
      user.gamesCollection.ids = user.gamesCollection.ids.filter(
        (e) => e !== id
      );

      await Promise.all([user.save(), collectionGame.save()]);

      return new GameDto(collectionGame.toObject());
    }
  }

  async getCollection(props) {
    const {
      user: { id: userId },
    } = props;
    const userCollection = await Users.findById(userId)
      .populate({
        path: "gamesCollection.list.game",
        select: "-inCollectionUsers -_id",
      })
      .lean();
    const result = userCollection.gamesCollection.list.map((e) => ({
      ...e.game,
      time: e.time,
    }));

    return result;
  }

  async updateCollectableTime({
    user: { id: userId },
    type,
    playedTime,
    id: gameId,
  }) {
    if (type === "game") {
      return await this.setGameTime(userId, gameId, playedTime);
    }
  }

  async setGameTime(userId, gameId, playedTime) {
    const user = await Users.findById(userId).populate({
      path: "gamesCollection.list.game",
      select: "id",
    });
    const game = user.gamesCollection.list.find(
      (item) => item.game?.id === +gameId
    );

    if (playedTime) {
      game.time = playedTime;
      await user.save();
    }

    return game?.time;
  }
}

module.exports = new CollectionService();
