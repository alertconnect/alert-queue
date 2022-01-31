const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Find all groups
 * @returns {Promise<void>}
 */
const getGroups = async () => {
  return await prisma.chat.findMany({
    where: {},
  });
};

/**
 * Find a group by chatId
 * @param {Number} chatId
 * @returns {Promise<void>}
 */
const getGroupByChatId = async (chatId) => {
  return await prisma.chat.findUnique({
    where: {
      chatId,
    },
  });
};

/**
 * Update or create a chat group
 * @param {Number} chatId
 * @param {Object} content
 * @returns {Promise<void>}
 */
const updateGroup = async (chatId, content) => {
  await prisma.chat.update({ chatId }, content, {
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
  await prisma.chat.delete({ chatId });
};

module.exports = {
  getGroups,
  getGroupByChatId,
  updateGroup,
  deleteGroupData,
};
