class AscendingDateHelper {
  static async ascendingDate(lands) {
    const landsWithDateAsc = lands.sort((a, b) => new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf());
    return landsWithDateAsc;
  }
}

module.exports = AscendingDateHelper;