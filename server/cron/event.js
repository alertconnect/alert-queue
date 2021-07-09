const cron = require('node-cron');
const downloadService = require('../services/download.service');
const updaterService = require('../services/updater.service');

/**
 * Refresh event data
 */
function downloadAlert() {
  cron.schedule(
    '*/30 * * * *',
    () => {
      console.log('debug', 'starting task: downloadLatestZip');
      downloadService
        .downloadLatestZip()
        .then(() => {
          console.log('info', 'task completed: downloadLatestZip');
        })
        .catch((error) => {
          console.log('error', 'task failed: downloadLatestZip');
          console.error(error);
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
    '0 * * * *',
    () => {
      console.log('debug', 'starting task: deleteExpiredEvent');
      updaterService
        .deleteExpiredEvent()
        .then(() => {
          console.log('info', 'task completed: deleteExpiredEvent');
        })
        .catch((error) => {
          console.log('error', 'task failed: deleteExpiredEvent');
          console.error(error);
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
