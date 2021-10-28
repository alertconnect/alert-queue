const mongoose = require('mongoose');
require('../models/sector.model');

/**
 * Query for short urls
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySectors = async (filter, options) =>
  await mongoose.model('Sector').find(filter, options);

module.exports = {
  querySectors,
};
