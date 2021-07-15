const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string()
      .default('development')
      .valid('production', 'development', 'test')
      .required(),
    PORT: Joi.number().default(8080),
    LOG_FILE_NAME: Joi.string().default('weather-alert-bot'),
    MONGO_HOST: Joi.string().default('localhost').required(),
    MONGO_PORT: Joi.number().default(27017).required(),
    MONGO_USER: Joi.string().min(0).allow('').allow(null).optional(),
    MONGO_PASS: Joi.string().min(0).allow('').allow(null).optional(),
    MONGO_DB: Joi.string().default('element-dev').required(),
    AUTH_SOURCE: Joi.string().default('element').optional(),
    RECONNECT_INTERVAL: Joi.number().default(1000),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema
  .prefs({ errors: { label: 'key' } })
  .validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  logFileName: envVars.LOG_FILE_NAME,
  reconnectInterval: envVars.RECONNECT_INTERVAL,
  user: envVars.MONGO_USER,
  password: envVars.MONGO_PASS,
  dbHost: envVars.MONGO_HOST,
  dbPort: envVars.MONGO_PORT,
  database: envVars.MONGO_DB,
  auth: {
    authSource: envVars.AUTH_SOURCE,
    user: envVars.MONGO_USER,
    password: envVars.MONGO_PASS,
  },
};
