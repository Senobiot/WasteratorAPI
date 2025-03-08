const Movies = require("../models/movie-model");
const ActorsCollection = require("../models/actor-model");
const Games = require("../models/game-model");
const Users = require("../models/users-model");

const GameDto = require("../dtos/game-dto");
const MovieDto = require("../dtos/movie-dto");

class CollectionService {
  async saveCollectable(props) {
    const {
      user: { id: userId },
      data: { id, type },
    } = props;

    if (type === "game") {
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

      return new GameDto(collectionGame.toObject());
    }

    if (type === "movie") {
      const collectionMovie = await Movies.findOne({ id }).populate("actors");
      console.log(collectionMovie);
      collectionMovie.inCollectionUsers.push(userId);

      const user = await Users.findById(userId);

      user.moviesCollection.list.push({
        movie: collectionMovie._id,
        time: collectionMovie.length,
      });
      user.moviesCollection.ids.push(id);

      await Promise.all([user.save(), collectionMovie.save()]);

      collectionMovie.inCollection = true;

      return new MovieDto(collectionMovie.toObject());
    }
  }

  async deleteCollectable(props) {
    const {
      user: { id: userId },
      data: { id, type },
    } = props;

    if (type === "game") {
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
    if (type === "movie") {
      const collectionMovie = await Movies.findOne({ id }).populate("actors");
      collectionMovie.inCollectionUsers =
        collectionMovie.inCollectionUsers.filter(
          (e) => e.toString() !== userId
        );
      collectionMovie.inCollection = false;

      const user = await Users.findById(userId);

      user.moviesCollection.list = user.moviesCollection.list.filter(
        (e) => e.movie.toString() !== collectionMovie._id.toString()
      );
      user.moviesCollection.ids = user.moviesCollection.ids.filter(
        (e) => e !== id
      );

      await Promise.all([user.save(), collectionMovie.save()]);

      return new MovieDto(collectionMovie.toObject());
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
