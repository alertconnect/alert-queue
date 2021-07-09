const catchAsync = require('../utils/catchAsync');
const pick = require('../utils/pick');
const { sectorService } = require('../services');

const getSectors = catchAsync(async (req, res) => {
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await sectorService.querySectors({}, {limit: 1000});
  res.send(result);
});

module.exports = {
  getSectors
}
