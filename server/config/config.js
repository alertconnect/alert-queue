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
    DATABASE_URL: Joi.string()
      .default('postgresql://prociv:prociv@localhost:5432/prociv')
      .required(),
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
  databaseUrl: envVars.DATABASE_URL,
};
