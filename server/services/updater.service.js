const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const logger = require('../utils/logger');

const EXTRACTION_PATH = './uploads/ext/';

const eventCode = (event) => {
  const geo = new RegExp('\\bIDROGEOLOGICO\\b');
  const hydro = new RegExp('\\bIDRAULICO\\b');
  const storm = new RegExp('\\bTEMPORALI\\b');
  if (hydro.test(event)) {
    return 'hydro';
  } else if (geo.test(event)) {
    return 'geo';
  } else if (storm.test(event)) {
    return 'storm';
  }
  return 'error';
};

const updateEventData = async () => {
  fs.readdir(EXTRACTION_PATH, (err, files) => {
    files
      .filter((file) => file.startsWith('Cap_'))
      .forEach((file) => {
        fs.readFile(`${EXTRACTION_PATH}${file}`, 'utf8', (err, data) => {
          parser.parseString(data, async (err, result) => {
            const alert = result.alert;
            const infoAlert = result.alert.info;
            if (infoAlert) {
              for (const info of infoAlert) {
                const arealArray = info.area;
                for (const area of arealArray) {
                  logger.info({
                    code: area.geocode[0].value.toString(),
                    description: area.areaDesc.toString() || '',
                  });
                  logger.info({
                    identifier: alert.identifier.toString(),
                    type: eventCode(info.event.toString()),
                    event: info.event.toString(),
                    urgency: info.urgency.toString(),
                    severity: info.severity.toString(),
                    certainty: info.certainty.toString(),
                    location_code: area.geocode[0].value.toString(),
                    location_desc: area.areaDesc.toString() || '',
                    onset: info.onset.toString(),
                    expires: info.expires.toString(),
                    received: alert.sent.toString(),
                  });
                }
              }
            }
          });
        });
      });
  });
};

module.exports = {
  updateEventData,
};
