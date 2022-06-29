class TwoPointsHelper {
  static async filterWithTwoPoints(lands, p1, p2) {
    const p1Splitted = p1.split(',');
    const p2Splitted = p2.split(',');

    if (p1Splitted.length < 2 || p2Splitted.length < 2) {
      throw ({ code: 403, message: 'A parameter is missing in the p1 or p2 parameters' });
    }

    const coord_x1 = p1Splitted[0];
    const coord_x2 = p2Splitted[0];
    const coord_y1 = p1Splitted[1];
    const coord_y2 = p2Splitted[1];

    const landsByTwoPoints = lands.filter(l => l.coord_x > coord_x1 && l.coord_x < coord_x2 && l.coord_y > coord_y1 && l.coord_y < coord_y2);

    if (!landsByTwoPoints) {
      throw ({ code: 404, message: 'Lands by two points not found' });
    }

    return landsByTwoPoints;
  }
}

module.exports = TwoPointsHelper;