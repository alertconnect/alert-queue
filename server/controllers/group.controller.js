const catchAsync = require('../utils/catchAsync');
const { groupService } = require('../services');

const getGroups = catchAsync(async (req, res) => {
  const result = await groupService.getGroups();
  res.send({
      groups: result
  });
});

const getGroupData = catchAsync(async (req, res) => {
  const result = await groupService.getGroupByChatId(req.params.chatId);
  res.send(result);
});

const updateGroupData = catchAsync(async (req, res) => {
  const result = await groupService.updateGroup(req.params.chatId, req.body);
  res.send(result);
});

const deleteGroup = catchAsync(async (req, res) => {
  const result = await groupService.deleteGroupData(req.params.chatId);
  res.send(result);
});

module.exports = {
  getGroups,
  getGroupData,
  updateGroupData,
  deleteGroup
}
