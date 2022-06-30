const DB = require('../models/index');
const Lands = DB.Land;

class LandsDBRepository {
  static async createLand(land) {
    const landCreated = await Lands.create(land);
    return landCreated;
  }

  static async getLands(page, size) {
    let lands;
    const offset = +page * +size;
    const limit = +size;

    if (page && size) {
      lands = await Lands.findAll({
        offset,
        limit
      });
    } else {
      lands = await Lands.findAll();
    }

    if (!lands) {
      throw ({ code: 404, message: "The collection of lands is empty" });
    }

    return lands;
  }

  static async getLandByCoords(coord_x, coord_y) {
    const land = await Lands.findOne({ where: { coord_x, coord_y } })

    if (!land) {
      throw ({ code: 404, message: "Land by coords not found" });
    }

    return land;
  }

  static async getLandById(id) {
    const land = await Lands.findOne({ where: { id } })

    if (!land) {
      throw ({ code: 404, message: "Land by id not found" });
    }

    return land;
  }
}

module.exports = LandsDBRepository;