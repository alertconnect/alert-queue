const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const logger = require('../utils/logger');
const config = require('../config/config');

const Queue = require('bull');
const Alert = require('../utils/classes/Alert');
const { pingHeartbeats } = require('./uptime.service');
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
const ALERT_TOKEN = config.uptime.alertToken;

/**
 * @description - Update event data from the latest zip file
 * @returns {Promise<void>}
 */
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
                  const AlertObj = new Alert(alert, info);
                  logger.info(
                    'New alert found on location ' +
                      AlertObj.location_code +
                      ' with type ' +
                      AlertObj.type +
                      ' sending to queue',
                  );
                  await alertQueue.add(AlertObj);
                }
              }
            } else {
              logger.info('No data available, Italy is safe!');
            }
            // Execute ping to uptime API
            await pingHeartbeats(ALERT_TOKEN);
          });
        });
      });
  });
};

module.exports = {
  updateEventData,
};
