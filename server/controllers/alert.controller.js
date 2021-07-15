const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const httpStatus = require('http-status');
const { alertService, downloadService } = require('../services');
const logger = require('../utils/logger');

const getGeoActiveAlert = catchAsync(async (req, res) => {
  const options = pick(req.query, ['geo']);
  const result = await alertService.findCurrentAlert(options.geo);
  logger.info('Incoming alert request', { geo: options.geo })
  res.send({
    result: result || []
  });
});

const refreshAlert = catchAsync(async (req, res) => {
  logger.info('Incoming refresh request')
  await downloadService.downloadLatestZip()
  res.status(httpStatus.OK).send();
})

module.exports = {
  getGeoActiveAlert,
  refreshAlert
}
