const db = require('../models/index.js');
const landModel = db.Land;
const apiResponseHandler = require('../helper/ApiResponse.ts')

class LandController {
    static async saveLand(req, res, next) {
        try {
            const data = req.body;
            await landModel.create(data);
            apiResponseHandler.send(req, res, "data", data, "Landt saved successfully")
        } catch (error) {
            const message = "error saving an land";
            apiResponseHandler.sendError(req, res, "data", null, message)
        }
    }
    static async fetchLandByCoords(req, res, next) {
        try {
            const coord_x = req.params.x
            const coord_y = req.params.y
            console.log(coord_x, coord_y)
            let isLandExist = await LandController.landExistByCoords(coord_x, coord_y)
            if (!isLandExist) {
                const message = "Land not available with given coords";
                apiResponseHandler.sendError(req, res, "data", null, message)
            } else {
                const data = isLandExist
                apiResponseHandler.send(req, res, "data", data, "Land fetched successfully")
            }
        } catch (error) {
            const message = "error fetching land";
            apiResponseHandler.sendError(req, res, "data", null, message)
        }
    }
    static async fetchLandById(req, res, next) {
        try {
            const land_id = req.params.land_id
            let isLandExist = await LandController.landExist(land_id)
            if (!isLandExist) {
                const message = "Land not available with given id";
                apiResponseHandler.sendError(req, res, "data", null, message)
            } else {
                const data = isLandExist
                apiResponseHandler.send(req, res, "data", data, "Land fetched successfully")
            }
        } catch (error) {
            const message = "error fetching land";
            apiResponseHandler.sendError(req, res, "data", null, message)
        }
    }
    static async fetchLandListByCoords(req, res, next) {
        try {
            const coords = req.query.c
            let coordArray = coords.split(';');
            let a = coordArray.length;
            const result = []
            for (let i = 0; i < a; i++) {
                let coord = coordArray[i].split(',');
                const coord_x = coord[0]
                const coord_y = coord[1]
                let isLandExist = await LandController.landExistByCoords(coord_x, coord_y)
                if (!isLandExist) {
                    const err = "Error"
                    let noValue = {
                        "id": 0,
                        "message": "Land not available with given cords" + coord_x + "," + coord_y+""
                    }
                    result.push(noValue);
                } else {
                    const data = isLandExist.dataValues
                    result.push(data);
                }
                
            }
            apiResponseHandler.send(req, res, "data", result, "Land fetched successfully")
        } catch (error) {
            const message = "error fetching land";
            apiResponseHandler.sendError(req, res, "data", null, message)
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