const mongoose = require('mongoose');
require("../models/chat.model");
const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

/**
 * Find a group by chatId
 * @param {Number} chatId
 * @returns {Promise<void>}
 */
const getGroupByChatId = async (chatId) => {
  return mongoose.model('Chat').findOne(
    {
      chatId
    }
  );
}

/**
 * Update or create a chat group
 * @param {Number} chatId
 * @param {Object} content
 * @returns {Promise<void>}
 */
const updateGroup = async (chatId, content) => {
  const group = await getGroupByChatId(chatId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
  }

  await mongoose.model('Chat').updateOne(
    { chatId },
    content,
    {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true
  });
};

module.exports = {
  getGroupByChatId,
  updateGroup,
};
