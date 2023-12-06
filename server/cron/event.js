const cron = require('node-cron');
const downloadService = require('../services/download.service');

const logger = require('../utils/logger');

/**
 * Refresh event data
 */
function downloadAlert() {
  cron.schedule(
    '*/5 * * * *',
    () => {
      logger.info('downloading event data');
      downloadService
        .downloadLatestZip()
        .then(() => {
          logger.info('unzipping event data');
        })
        .catch((error) => {
          logger.info(error);
        });
    },
    {
      scheduled: true,
    },
  );
}

module.exports = () => {
  downloadAlert();
};
