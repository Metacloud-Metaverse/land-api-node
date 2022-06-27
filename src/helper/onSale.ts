class OnSaleHelper {
  static async isOnSale(lands, onSale) {
    const onSaleLands = lands.filter(L => L.is_on_sale == onSale);
    return onSaleLands;
  }
}

module.exports = OnSaleHelper;