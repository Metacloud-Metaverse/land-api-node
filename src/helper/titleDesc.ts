class DescendingTitleHelper {
  static async descendingTitle(lands) {
    const landsWithTitleDesc = lands.sort((a, b) => a.title > b.title ? -1 : 1);
    return landsWithTitleDesc
  }
}

module.exports = DescendingTitleHelper;