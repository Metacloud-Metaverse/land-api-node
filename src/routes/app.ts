const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.ts");

const landController = require('../controllers/Land.ts');
const configTestController = require('../controllers/ConfigTest.ts');

router.get('/land/search', landController.searchLand);
router.get('/land/search-by-coords/:coord_x?/:coord_y?', landController.searchLandByCoords);
router.get('/land/search-by-id/:id?', landController.searchLandById);
router.get('/land/list-with-two-points', landController.listLandByTwoPoints);
router.get('/land/list-with-coordinates', landController.listLandWhitCoords);
router.get('/land/get-lands-by-user-id/:user_id?', landController.getLandsByUserId);

router.post('/config/:id?', configTestController.createOrUpdateConfig);
router.get('/config/:id', configTestController.getConfigById);

router.get('/land/LANDS', landController.getLands);
router.post('/land/create', auth ,landController.createLand);

module.exports = router;
    