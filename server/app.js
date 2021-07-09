require('dotenv').config();

// Init libs
const morgan = require('./utils/morgan');
const express = require('express');
const cors = require('cors');
const i18n = require('i18n');
const helmet = require('xss-clean');
const xss = require('xss-clean');
const compression = require('compression');
const httpStatus = require('http-status');
const config = require('./config/config');

const ApiError = require('./utils/ApiError');

// Init internal setup
const routesNew = require('./routes/v1');
const cron = require('./cron');

// Create global app object
const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// Run cron job
cron.eventJob();

app.use(cors());

// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());

// gzip compression
app.use(compression());

// Configure i18n
i18n.configure({
  defaultLocale: 'it',
  objectNotation: true,
  locales: ['it', 'en'],
  directory: __dirname + '/locales',
});
app.use(i18n.init);

// enable cors
app.use(cors());
app.options('*', cors());

// Expose robots.txt
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send('User-agent: *\nDisallow: /');
});

// Init routes
app.use('/api/v1', routesNew);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

module.exports = app;
