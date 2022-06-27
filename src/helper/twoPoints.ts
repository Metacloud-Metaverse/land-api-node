class TwoPointsHelper {
  static async filterWithTwoPoints(lands, p1, p2) {
    const p1Splitted = p1.split(',');
    const p2Splitted = p2.split(',');

    const coord_x1 = p1Splitted[0];
    const coord_x2 = p2Splitted[0];
    const coord_y1 = p1Splitted[1];
    const coord_y2 = p2Splitted[1];

    const landsByTwoPoints = lands.filter(l => l.coord_x > coord_x1 && l.coord_x < coord_x2 && l.coord_y > coord_y1 && l.coord_y < coord_y2);

    return landsByTwoPoints;
  }
}

module.exports = TwoPointsHelper;