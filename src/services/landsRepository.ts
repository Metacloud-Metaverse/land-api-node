const DB = require('../models/index');
const Lands = DB.Land;

class LandsDBRepository {
  static async createLand(land) {
    const landCreated = await Lands.create(land);
    return landCreated;
  }

  static async getLands() {
    const lands = await Lands.findAll();
    return lands;
  }

  static async getLandByCoords(coord_x, coord_y) {
    const land = await Lands.findOne({ where: { coord_x, coord_y } })
    return land;
  }

  static async getLandById(id) {
    const land = await Lands.findOne({ where: { id } })
    return land;
  }
}

module.exports = LandsDBRepository;