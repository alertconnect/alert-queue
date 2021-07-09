const catchAsync = require('../utils/catchAsync');
const { groupService } = require('../services');

const getGroupData = catchAsync(async (req, res) => {
  const result = await groupService.getGroupByChatId(req.params.chatId);
  res.send(result);
});

const updateGroupData = catchAsync(async (req, res) => {
  const result = await groupService.updateGroup(req.params.chatId, req.body);
  res.send(result);
});

module.exports = {
  getGroupData,
  updateGroupData
}
