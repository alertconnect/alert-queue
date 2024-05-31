class Sector {
  /**
   * @description - Sector class
   * @param {Object} location - Info object
   */
  constructor(location) {
    this.code = location.geocode[0].value.toString();
    this.description = location.areaDesc.toString() || '';
  }
}

module.exports = Sector;
