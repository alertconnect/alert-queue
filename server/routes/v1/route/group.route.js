const express = require('express');
const validate = require('../../../middlewares/validate');
const groupController = require('../../../controllers/group.controller');
const groupValidation = require('../../../validations/group.validation');

const router = express.Router();

router
  .route('/')
  .get(groupController.getGroups)

router
  .route('/:chatId')
  .get(validate(groupValidation.getGroupData), groupController.getGroupData)
  .put(validate(groupValidation.updateGroupData), groupController.updateGroupData)
  .delete(validate(groupValidation.getGroupData), groupController.deleteGroup)

module.exports = router;
