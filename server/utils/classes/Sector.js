class Sector {
  /**
   * @description - Sector class
   * @param {Object} info - Info object
   */
  constructor(info) {
    this.code = info.area[0].geocode[0].value.toString();
    this.description = info.area[0].areaDesc.toString() || '';
  }
}

module.exports = Sector;
