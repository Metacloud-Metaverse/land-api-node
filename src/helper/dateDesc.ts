class DescendingDateHelper {
  static async descendingDate(lands) {
    const landsWithDateDesc = lands.sort((a, b) => new Date(b.created_at).valueOf() - new Date(a.created_at).valueOf());
    return landsWithDateDesc;
  }
}

module.exports = DescendingDateHelper;