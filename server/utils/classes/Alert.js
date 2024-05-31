const eventCode = require('../decode-helper');
class Alert {
  /**
   * @description - Alert class
   * @param {Object} alert - Alert object
   * @param {Object} info - Info object
   * @param {Sector} sector
   */
  constructor(alert, info, sector) {
    this.identifier = alert.identifier.toString();
    this.type = eventCode(info.event.toString());
    this.event = info.event.toString();
    this.urgency = info.urgency.toString();
    this.severity = info.severity.toString();
    this.certainty = info.certainty.toString();
    this.location_code = sector.code;
    this.location_desc = sector.description;
    this.onset = info.onset.toString();
    this.expires = info.expires.toString();
    this.received = alert.sent.toString();
  }
}

module.exports = Alert;
