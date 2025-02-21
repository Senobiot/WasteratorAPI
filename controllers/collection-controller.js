const collectionService = require("../services/collection-service");

class CollectionController {
  async saveCollectable(req, res, next) {
    try {
      const collectable = await collectionService.saveCollectable(req.body);
      return res.json(collectable);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = new CollectionController();