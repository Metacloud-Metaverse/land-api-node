const configTestRepository = require('../services/configTestRepository.ts');

class ConfigTest {

  static async createOrUpdateConfig(req, res) {
      const { id } = req.params;
      const { data } = req.body;

      if (id) {
        await configTestRepository.updateConfig(data, id);
        const newConfig = await configTestRepository.getConfigById(id);
        return res.status(200).json(newConfig);
      }

      const createConfig = await configTestRepository.createConfig(req.body);

      return res.status(200).json(createConfig);
  }

  static async getConfigById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(403).json({
          status: 'FAILED',
          message: 'The id param is required'
        })
      };

      const config = await configTestRepository.getConfigById(id);

      return res.status(200).json(config);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

}

module.exports = ConfigTest;