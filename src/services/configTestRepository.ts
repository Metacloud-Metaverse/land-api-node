const db = require('../models/index');
const Configs = db.ConfigTest;

class ConfigTestDBRepositoy {
  static async createConfig(config) {
    const configCreated = await Configs.create(config);
    return configCreated;
  }

  static async updateConfig(data, id) {
    const configUpdated = Configs.update({ data }, { where: { id } });
    return configUpdated;
  }

  static async getConfigById(id) {
    const config = await Configs.findOne({ where: { id } })
    return config;
  }
}

module.exports = ConfigTestDBRepositoy;