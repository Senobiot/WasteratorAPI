const collectionService = require("../services/collection-service");

class CollectionController {
  async addToCollection(req, res, next) {
    try {
      const collectable = await collectionService.saveCollectable(req.body);
      return res.json(collectable);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async deleteFromCollection(req, res, next) {
    try {
      const collectable = await collectionService.deleteCollectable(req.body);
      return res.json(collectable);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async updateCollectableTime(req, res, next) {
    try {
      const collectable = await collectionService.updateCollectableTime(
        req.body
      );
      return res.json(collectable);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  async getCollection(req, res, next) {
    try {
      const collection = await collectionService.getCollection(req);
      return res.json(collection);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new CollectionController();
