const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Find all groups
 * @returns {Promise<void>}
 */
const getGroups = async () => {
  return await prisma.chat.find({});
};

/**
 * Find a group by chatId
 * @param {Number} chatId
 * @returns {Promise<void>}
 */
const getGroupByChatId = async (chatId) => {
  return await prisma.chat.findOne({
    chatId,
  });
};

/**
 * Update or create a chat group
 * @param {Number} chatId
 * @param {Object} content
 * @returns {Promise<void>}
 */
const updateGroup = async (chatId, content) => {
  await prisma.chat.updateOne({ chatId }, content, {
    upsert: true,
    new: true,
    setDefaultsOnInsert: true,
  });
};

/**
 * Delete a chat group
 * @param {Number} chatId
 * @returns {Promise<void>}
 */
const deleteGroupData = async (chatId) => {
  const group = await getGroupByChatId(chatId);
  if (!group) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
  }
  await prisma.chat.deleteOne({ chatId });
};

module.exports = {
  getGroups,
  getGroupByChatId,
  updateGroup,
  deleteGroupData,
};
