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
    LOG_FILE_NAME: Joi.string().default('prociv-api'),
    REDIS_HOST: Joi.string().required().description('Redis host url'),
    REDIS_PORT: Joi.number().default(6379).description('Redis port'),
    REDIS_USER: Joi.string().description('Redis user'),
    REDIS_PASSWORD: Joi.string().description('Redis password'),
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
  redis: {
    host: envVars.REDIS_HOST,
    port: envVars.REDIS_PORT,
    user: envVars.REDIS_USER,
    password: envVars.REDIS_PASSWORD,
  },
};
