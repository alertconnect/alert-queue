const mongoose = require('mongoose');
const dayjs = require('dayjs');
require('../models/event.model');

/**
 * Find current active events by geo code
 * @param geo
 * @returns {Promise<Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown>, {}, unknown>>}
 */
const findCurrentAlert = async (geo) => {
  const currentTime = dayjs().toISOString();
  return mongoose.model('Event').find({
    geo,
    expires: { $gte: currentTime },
  });
};

module.exports = {
  findCurrentAlert,
};
