const catchAsync = require('../utils/catchAsync');
const { sectorService } = require('../services');

const getSectors = catchAsync(async (req, res) => {
  const result = await sectorService.querySectors();
  res.send(result);
});

module.exports = {
  getSectors,
};
