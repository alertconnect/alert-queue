const cron = require('node-cron');
const downloadService = require('../services/download.service');
const updaterService = require('../services/updater.service');
const logger = require('../utils/logger');

/**
 * Refresh event data
 */
function downloadAlert() {
  cron.schedule(
    '*/30 * * * *',
    () => {
      logger.debug(`Task scheduled: downloadLatestZip`);
      downloadService
        .downloadLatestZip()
        .then(() => {
          logger.info(`Task completed: downloadLatestZip`);
        })
        .catch((error) => {
          logger.error(`Task failed: downloadLatestZip`, {
            error
          });
        });
    },
    {
      scheduled: true,
    },
  );
}

/**
 * Refresh event data
 */
function cleanExpiredEvent() {
  cron.schedule(
    '*/45 * * * *',
    () => {
      logger.debug(`Task scheduled: deleteExpiredEvent`);
      updaterService
        .deleteExpiredEvent()
        .then(() => {
          logger.info(`Task completed: deleteExpiredEvent`);
        })
        .catch((error) => {
          logger.error(`Task failed: deleteExpiredEvent`, {
            error
          });
        });
    },
    {
      scheduled: true,
    },
  );
}

module.exports = () => {
  downloadAlert();
  cleanExpiredEvent();
};
