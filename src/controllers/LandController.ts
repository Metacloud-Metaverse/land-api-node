const db = require('../models/index.js');
const landModel = db.Land;
const apiResponseHandler = require('../helper/ApiResponse.ts')

class LandController {
    static async saveLand(req, res, next) {
        try {
            const data = req.body;
            await landModel.create(data);
            apiResponseHandler.send(req, res, "land", data, "Landt saved successfully")
        }
        catch (error) {
            next(error);
            const err = "error"
            const message = "error saving an land";
            apiResponseHandler.sendError(req, res, "land", err, message)
        }
    }
    static async fetchLandByCoords(req, res, next) {
        try {
            const coord_x = req.params.x
            const coord_y = req.params.y
            console.log(coord_x, coord_y)
            let isLandExist = await LandController.landExistByCoords(coord_x, coord_y)
            if (!isLandExist) {
                const err = "Error"
                const message = "Land not available with given coords";
                apiResponseHandler.sendError(req, res, "land", err, message)
            } else {
                const data = isLandExist
                apiResponseHandler.send(req, res, "user", data, "Land fetched successfully")
            }
        } catch (error) {
            next(error);
            const err = "error"
            const message = "error fetching land";
            apiResponseHandler.sendError(req, res, "land", err, message)
        }
    }
    static async fetchLandById(req, res, next) {
        try {
            const land_id = req.params.land_id
            let isLandExist = await LandController.landExist(land_id)
            if (!isLandExist) {
                const err = "Error"
                const message = "Land not available with given id";
                apiResponseHandler.sendError(req, res, "land", err, message)
            } else {
                const data = isLandExist
                apiResponseHandler.send(req, res, "user", data, "Land fetched successfully")
            }
        } catch (error) {
            next(error);
            const err = "error"
            const message = "error fetching land";
            apiResponseHandler.sendError(req, res, "land", err, message)
        }
    }
   
    static async landExist(id) {
        return landModel.findOne({ where: { id: id } })
    }
    static async landExistByCoords(x, y) {
        return landModel.findOne({ where: { coord_x: x , coord_y: y} })
    }
}

module.exports = LandController