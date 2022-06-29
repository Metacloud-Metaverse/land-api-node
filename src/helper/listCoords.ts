class ListWithCoordsHelper {
  static async getWithArrayCoords(c, lands) {
    let arrCoords = c.split(';');

    const listOfLandsByArrayCoords = arrCoords.flatMap(comma => {
      const commaSplitted = comma.split(',');

      if (commaSplitted < 2) {
        throw ({ code: 403, message: 'A parameter is missing in the coords' });
      }

      return lands.filter(land => land.coord_x == commaSplitted[0] && land.coord_y == commaSplitted[1]);
    })

    return listOfLandsByArrayCoords;
  }
}

module.exports = ListWithCoordsHelper;