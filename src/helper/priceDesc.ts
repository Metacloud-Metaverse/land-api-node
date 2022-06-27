class DescendingPriceHelper {
  static async descendingPrice(lands) {
    const landsWithPriceDesc = lands.sort((a, b) => b.price - a.price);
    return landsWithPriceDesc;
  }
}

module.exports = DescendingPriceHelper;