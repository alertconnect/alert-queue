const mongoose = require('mongoose');
const moment = require('moment');
require("../models/event.model");

/**
 * Find current active events by geo code
 * @param geo
 * @returns {Promise<Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown>, {}, unknown>>}
 */
const findCurrentAlert = async (geo) => {
  const currentTime = moment().toISOString();
  return mongoose.model('Event').find(
    {
      geo: geo,
      expires: { $gte: currentTime}
    }
  );
}

module.exports = {
  findCurrentAlert,
};
