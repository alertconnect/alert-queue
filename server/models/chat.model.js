const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Chat Schema
 */

const ChatSchema = new Schema({
  chatId: { type: Number, required: true},
  title: String,
  type: String,
  geo: { type: String, required: true},
  geoName: { type: String, default: ''},
  lastAlert: { type: Date, default: Date.now },
});

/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
