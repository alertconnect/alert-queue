const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const logger = require('../utils/logger');
const config = require('../config/config');

const Queue = require('bull');
const REDIS_OPTIONS = {
  port: config.redis.port,
  host: config.redis.host,
  username: config.redis.user,
  password: config.redis.password,
};

const alertQueue = new Queue('alerts', {
  redis: REDIS_OPTIONS,
});

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
                  logger.info(
                    'New alert for code ' +
                      alert.identifier +
                      ' sending to queue',
                  );
                  await alertQueue.add({
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
            } else {
              logger.info('No data available, Italy is safe!');
            }
          });
        });
      });
  });
};

module.exports = {
  updateEventData,
};
