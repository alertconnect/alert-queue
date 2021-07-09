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
      geoName: Joi.string(),
      lastAlert: Joi.date(),
    })
    .min(1),
};

module.exports = {
  getGroupData,
  updateGroupData,
};
