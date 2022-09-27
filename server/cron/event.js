const cron = require('node-cron');
const downloadService = require('../services/download.service');

/**
 * Refresh event data
 */
function downloadAlert() {
  cron.schedule(
    '*/30 * * * *',
    () => {
      console.log('downloading event data');
      downloadService
        .downloadLatestZip()
        .then(() => {
          console.log('unzipping event data');
        })
        .catch((error) => {
          console.log(error);
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
