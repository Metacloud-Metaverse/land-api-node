const landsRespository = require('../services/landsRepository.ts');
const onSaleFilter = require('../helper/onSale.ts');
const priceAscending = require('../helper/priceAsc.ts');
const priceDescending = require('../helper/priceDesc.ts');
const titleAscending = require('../helper/titleAsc.ts');
const titleDescending = require('../helper/titleDesc.ts');
const dateAscending = require('../helper/dateAsc.ts');
const dateDescending = require('../helper/dateDesc.ts');
const byTwoPoints = require('../helper/twoPoints.ts');
const listWithCoords = require('../helper/listCoords.ts');

class Land {
  static async createLand(req, res) {
    try {
      const landCreated = await landsRespository.createLand(req.body);
      return res.status(200).json(landCreated);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getLands(req, res) {
    try {
      const lands = await landsRespository.getLands();
      return res.status(200).json(lands);
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  static async searchLand(req, res) {
    let { onSale, sortBy, typeOrder, page, size } = req.query;

    const ASCENDING_ORDER = 'asc';
    const DESCENDING_ORDER = 'desc';
    const TITLE = 0;
    const CREATED = 1;
    const PRICE = 2;

    try {
      const lands = await landsRespository.getLands(page, size);
      const landsOnSaleFiltered = await onSaleFilter.isOnSale(lands, onSale);

      if (onSale && sortBy == TITLE && typeOrder == ASCENDING_ORDER) {
        const landsSaleWithTitleAsc = await titleAscending.ascendingTitle(landsOnSaleFiltered);
        return res.status(200).json(landsSaleWithTitleAsc);
      }

      if (onSale && sortBy == TITLE && typeOrder == DESCENDING_ORDER) {
        const landsSaleWithTitleDesc = await titleDescending.descendingTitle(landsOnSaleFiltered);
        return res.status(200).json(landsSaleWithTitleDesc);
      }

      if (onSale && sortBy == CREATED && typeOrder == ASCENDING_ORDER) {
        const landsSaleWithDateAsc = await dateAscending.ascendingDate(landsOnSaleFiltered);
        return res.status(200).json(landsSaleWithDateAsc);
      }

      if (onSale && sortBy == CREATED && typeOrder == DESCENDING_ORDER) {
        const landsSaleWithDateDesc = await dateDescending.descendingDate(landsOnSaleFiltered);
        return res.status(200).json(landsSaleWithDateDesc);
      }

      if (onSale && sortBy == PRICE && typeOrder == ASCENDING_ORDER) {
        const landsSaleWithPriceAsc = await priceAscending.ascendingPrice(landsOnSaleFiltered);
        return res.status(200).json(landsSaleWithPriceAsc);
      }

      if (onSale && sortBy == PRICE && typeOrder == DESCENDING_ORDER) {
        const landsSaleWithPriceDesc = await priceDescending.descendingPrice(landsOnSaleFiltered);
        return res.status(200).json(landsSaleWithPriceDesc);
      }

      if (onSale) {
        return res.status(200).json(landsOnSaleFiltered);
      }

      if (sortBy == TITLE && typeOrder == ASCENDING_ORDER) {
        const landsAscTitle = await titleAscending.ascendingTitle(lands);
        return res.status(200).json(landsAscTitle);
      }

      if (sortBy == TITLE && typeOrder == DESCENDING_ORDER) {
        const landsAscDescTitle = await titleDescending.descendingTitle(lands);
        return res.status(200).json(landsAscDescTitle);
      }

      if (sortBy == CREATED && typeOrder == ASCENDING_ORDER) {
        const landsAscDate = await dateAscending.ascendingDate(lands);
        return res.status(200).json(landsAscDate);
      }

      if (sortBy == CREATED && typeOrder == DESCENDING_ORDER) {
        const landsDescDate = await dateDescending.descendingDate(lands);
        return res.status(200).json(landsDescDate);
      }

      if (sortBy == PRICE && typeOrder == ASCENDING_ORDER) {
        const landsAscPrice = await priceAscending.ascendingPrice(lands);
        return res.status(200).json(landsAscPrice);
      }

      if (sortBy == PRICE && typeOrder == DESCENDING_ORDER) {
        const landsDescPrice = await priceDescending.descendingPrice(lands);
        return res.status(200).json(landsDescPrice);
      }

      return res.status(200).json(lands)
    } catch (e) {
      return res.status(e.code).json({
        status: 'FAILED',
        message: e.message
       })
    }
  }

  static async searchLandByCoords(req, res) {
    try {
      const { coord_x, coord_y } = req.params;

      if (!coord_x || !coord_y) {
        return res.status(403).json({
          status: 'FAILED',
          message: 'The corresponding params were not sent'
        })
      }

      const landWithCoords = await landsRespository.getLandByCoords(coord_x, coord_y);

      return res.status(200).json(landWithCoords);
    } catch (e) {
      return res.status(e.code).json({
        status: 'FAILED',
        message: e.message
      });
    }
  }

  static async searchLandById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(403).json({
          status: 'FAILED',
          message: 'The id is missing on req.params'
        })
      }

      const landWithId = await landsRespository.getLandById(id);

      return res.status(200).json(landWithId);
    } catch (e) {
      return res.status(e.code).json({
        status: 'FAILED',
        message: e.message
      });
    }
  }

  static async listLandByTwoPoints(req, res) {
    try {
      const { p1, p2 } = req.query;

      if (!p1 || !p2) {
        return res.status(403).json({
          status: 'FAILED',
          message: 'The corresponding queries were not sent'
        })
      }

      const lands = await landsRespository.getLands();

      const landsByTwoPoints = await byTwoPoints.filterWithTwoPoints(lands, p1, p2);

      return res.status(200).json(landsByTwoPoints);
    } catch (e) {
      return res.status(e.code).json({
        status: 'FAILED',
        message: e.message
      });
    }
  }

  static async listLandWhitCoords(req, res) {
    try {
      const { c } = req.query;

      if (!c) {
        return res.status(403).json({
          status: 'FAILED',
          message: 'You need to pass the array of coords'
        });
      }

      const lands = await landsRespository.getLands();

      const listedWhitCoords = await listWithCoords.getWithArrayCoords(c, lands);

      return res.status(200).json(listedWhitCoords);
    } catch (e) {
      return res.status(e.code).json({
        status: 'FAILED',
        message: e.message
      });
    }
  }
}

module.exports = Land;
