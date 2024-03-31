const eventCode = require('../decode-helper');
class Alert {
  /**
   * @description - Alert class
   * @param {Object} alert - Alert object
   * @param {Object} info - Info object
   */
  constructor(alert, info) {
    this.identifier = alert.identifier.toString();
    this.type = eventCode(info.event.toString());
    this.event = info.event.toString();
    this.urgency = info.urgency.toString();
    this.severity = info.severity.toString();
    this.certainty = info.certainty.toString();
    this.location_code = info.area[0].geocode[0].value.toString();
    this.location_desc = info.area[0].areaDesc.toString() || '';
    this.onset = info.onset.toString();
    this.expires = info.expires.toString();
    this.received = alert.sent.toString();
  }
}

module.exports = Alert;
