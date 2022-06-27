class AscendingTitleHelper {
  static async ascendingTitle(lands) {
    const landsWithTitleAsc = lands.sort((a, b) => a.title > b.title ? 1 : -1);
    return landsWithTitleAsc
  }
}

module.exports = AscendingTitleHelper;