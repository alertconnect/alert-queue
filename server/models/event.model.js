const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Event Schema
 */

const EventSchema = new Schema({
  geo: { type: String, required: true},
  type: { type: String, required: true},
  description: String,
  event: String,
  urgency: String,
  severity: String,
  certainty: String,
  onset: { type: Date, default: Date.now },
  expires: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  sendedAt: { type: Date, default: Date.now },
  identifier: String
});

/**
 * @typedef Event
 */
const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
