const landsRespository = require('../services/landsRepository.ts');
const onSaleFilter = require('../helper/onSale.ts');
const priceAscending = require('../helper/priceAsc.ts');
const priceDescending = require('../helper/priceDesc.ts');
const titleAscending = require('../helper/titleAsc.ts');
const titleDescending = require('../helper/titleDesc.ts');
const dateAscending = require('../helper/dateAsc.ts');
const dateDescending = require('../helper/dateDesc.ts');
const byTwoPoints = require('../helper/twoPoints.ts');

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
    let { onSale, sortBy, typeOrder } = req.query;

    const ASCENDING_ORDER = 'asc';
    const DESCENDING_ORDER = 'desc';
    const TITLE = 0;
    const CREATED = 1;
    const PRICE = 2;

    try {
      const lands = await landsRespository.getLands()
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
    } catch (error) {
      return res.status(500).json({ error })
    }
  }

  static async searchLandByCoords(req, res) {
    try {
      const { coord_x, coord_y } = req.params;
      const landWithCoords = await landsRespository.getLandByCoords(coord_x, coord_y);

      return res.status(200).json(landWithCoords);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async searchLandById(req, res) {
    try {
      const { id } = req.params;
      const landWithId = await landsRespository.getLandById(id);

      return res.status(200).json(landWithId);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async listLandByTwoPoints(req, res) {
    try {
      const { p1, p2 } = req.query;

      const lands = await landsRespository.getLands();

      const landsByTwoPoints = await byTwoPoints.filterWithTwoPoints(lands, p1, p2);

      return res.status(200).json(landsByTwoPoints);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getLandsByUserId(req, res) {

  }
}

module.exports = Land;

/*
- API - Search lands
- API - Fetch Lands with Two Points
- API - Fetch Land with coordinates
- API - Get by ID
- API - Get By Me
*/