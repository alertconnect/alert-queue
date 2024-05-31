const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const logger = require('../utils/logger');
const config = require('../config/config');

const Queue = require('bull');
const Alert = require('../utils/classes/Alert');
const { pingHeartbeats } = require('./uptime.service');
const Sector = require('../utils/classes/Sector');
const REDIS_OPTIONS = {
  port: config.redis.port,
  host: config.redis.host,
  username: config.redis.user,
  password: config.redis.password,
};

const alertQueue = new Queue('alerts', {
  redis: REDIS_OPTIONS,
});

const sectorsQueue = new Queue('sectors', {
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
                const locationArray = info.area;
                for (const location of locationArray) {
                  /**
                   *  Create a new sector object and add it to the queue
                   */

                  const sector = new Sector(location);
                  logger.info(
                    `New incoming sector with code ${sector.code}, adding to queue`,
                  );
                  if (config.env !== 'development') {
                    await sectorsQueue.add(sector).catch((error) => {
                      logger.error(
                        `Error adding sector job to queue: ${error}`,
                      );
                    });
                  }

                  /**
                   *  Create a new alert object and add it to the queue
                   */

                  const AlertObj = new Alert(alert, info, sector);
                  logger.info(
                    `New alert found on location ${AlertObj.location_code} with type ${AlertObj.type}, adding to queue`,
                  );
                  if (config.env !== 'development') {
                    await alertQueue.add(AlertObj).catch((error) => {
                      logger.error(
                        `Error adding sector job to queue: ${error}`,
                      );
                    });
                  }
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
