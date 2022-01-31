const Joi = require('joi');

const getGroupData = {
  params: Joi.object().keys({
    chatId: Joi.number().integer().required(),
  }),
};

const updateGroupData = {
  params: Joi.object().keys({
    chatId: Joi.number().integer(),
  }),
  body: Joi.object()
    .keys({
      chatId: Joi.number().integer(),
      title: Joi.string(),
      type: Joi.string(),
      geo: Joi.string(),
      lastAlert: {
        date: Joi.date(),
        identifier: Joi.string(),
      },
    })
    .min(1),
};

module.exports = {
  getGroupData,
  updateGroupData,
};
