const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Sector Schema
 */

const SectorSchema = new Schema({
  geo: { type: String, required: true},
  description: String
});

/**
 * @typedef Sector
 */
const Sector = mongoose.model('Sector', SectorSchema);

module.exports = Sector;
