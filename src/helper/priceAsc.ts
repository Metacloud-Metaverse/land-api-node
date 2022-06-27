class AscendingPriceHelper {
  static async ascendingPrice(lands) {
    const landsWithPriceAsc = lands.sort((a, b) => a.price - b.price);
    return landsWithPriceAsc;
  }
}

module.exports = AscendingPriceHelper;