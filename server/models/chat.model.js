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
  lastAlert: {
    date : { type: Date, default: Date.now() },
    identifier: String
  },
});

/**
 * @typedef Chat
 */
const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;
