const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.ts");
const landController = require("../controllers/LandController.ts");


router.post('/land/create', landController.saveLand)
router.get('/land/fetch/:land_id', landController.fetchLandById)
router.get('/land/fetch-by-coords/:x/:y', landController.fetchLandByCoords)
router.get('/land/list-with-coordinates', landController.fetchLandListByCoords)
router.get('/land/search', landController.searchLand)

module.exports = router;
    