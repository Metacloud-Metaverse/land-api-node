const { Router } = require("express");
const router = Router();
const auth = require("../middleware/auth.ts");
const homeController = require("../controllers/HomeController.ts");
const landController = require("../controllers/LandController.ts");


router.get('/home/test', homeController.test)
router.get('/home/test-db', homeController.testDb)
router.post('/land/create', landController.saveLand)
router.get('/land/fetch/:land_id', landController.fetchLandById)
router.get('/home/test-jwt', auth, homeController.authenticateToken)
router.get('/land/fetch-by-coords/:x/:y', landController.fetchLandByCoords)
router.get('/land/list-with-coordinates', landController.fetchLandListByCoords)

module.exports = router;
    