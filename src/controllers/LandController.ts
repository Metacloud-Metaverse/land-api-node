const db = require('../models/index.js');
const landModel = db.Land;
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const apiResponseHandler = require('../helper/ApiResponse.ts')

class LandController {
    static async saveLand(req, res, next) {
        try {
            const data = req.body;
            await landModel.create(data);
            apiResponseHandler.send(req, res, "data", data, "Land saved successfully")
        } catch (error) {
            const message = "error saving a land";
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
                        "message": "Land not available with given cords" + coord_x + "," + coord_y + ""
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
    static async searchLand(req, res, next) {
        try {
            const data = req.query
            const whereCondition = {}
            let sortByCondition = ["id"]
            if (data.title) {
                if (isNaN(data.title)) {
                    whereCondition['title'] = { [Op.like]: '%' + data.title + '%' }
                }
            }
            if (data.onlyOnSale) {
                if (!isNaN(data.onlyOnSale) && (data.onlyOnSale < 2)) {
                    whereCondition['is_on_sale'] = data.onlyOnSale
                } else {
                    const para = 'onlyOnSale'
                    LandController.validateError(req, res, para)
                    return
                }
            }
            if (data.sortBy) {
                if (!isNaN(data.sortBy) && (data.sortBy < 3)) {
                    if (data.sortBy == 0) { sortByCondition = ["title"] }
                    if (data.sortBy == 1) { sortByCondition = ["created_at", "DESC"] }
                    if (data.sortBy == 2) { sortByCondition = ["price", "ASC"] }
                } else {
                    const para = 'sortBy'
                    LandController.validateError(req, res, para)
                    return
                }
            }
            let offset = null
            if (!data.page) {
                data.page = null
            } else if (data.page < 1) {
                data.page = 1
            }
            if (!data.page && !data.limit) {
                data.limit = null
            } else if ((data.page && !data.limit) || (data.limit && (data.limit < 1))) {
                data.limit = process.env.LIMIT
            }
            if (data.limit && data.page) {
                offset = data.limit * (data.page - 1)
            }
            const result = await landModel.findAll({
                where: whereCondition,
                order: [[sortByCondition]],
                limit: data.limit,
                offset: offset
            },
            )
            if (!result || result.length == 0) {
                const message = "No Land matches with given data"
                apiResponseHandler.sendError(req, res, "data", null, message)
            } else {
                apiResponseHandler.send(req, res, "data", result, "Land fetched successfully")
            }
        } catch (error) {
            const message = "Error fetching lands, Please try again with correct data"
            apiResponseHandler.sendError(req, res, "data", null, message)
        }
    }
    static async landExist(id) {
        return landModel.findOne({ where: { id: id } })
    }
    static async landExistByCoords(x, y) {
        return landModel.findOne({ where: { coord_x: x, coord_y: y } })
    }
    static async validateError(req, res, para) {
        const message = `Data of ${para} is not valid, please use valid data`
        apiResponseHandler.sendError(req, res, "data", null, message)
        return
    }
}

module.exports = LandController