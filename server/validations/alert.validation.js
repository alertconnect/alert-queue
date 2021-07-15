const Joi = require('joi');

const query = {
  query: Joi.object().keys({
    geo: Joi.string().required(),
  }),
};

module.exports = {
  query,
};
