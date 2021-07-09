const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./utils/logger');

let server;

const dbUrl = `mongodb://${config.dbHost}:${config.dbPort}/${config.database}`;
const CONNECT_OPTIONS = {
  auto_reconnect: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  keepAlive: true,
  keepAliveInitialDelay: config.reconnectInterval,
};

function connect() {
  if (config.user.length || config.password.length) {
    CONNECT_OPTIONS.auth = config.auth;
    console.info('Authentication active', {
      user: config.user,
    });
  }

  mongoose.connect(dbUrl, CONNECT_OPTIONS)
    .then((r) => {
      server = app.listen(config.port, () => {
        logger.info(`Listening to port ${config.port}`);
      });
    })
    .catch((e) => {
    console.error(e);
  });
}

const db = mongoose.connection;

db.on('connecting', () => {
  console.info('Connecting to MongoDB', {
    uri: dbUrl,
  });
});

db.on('connected', () => {
  console.info('Connected to MongoDB!');
});

db.once('open', () => {
  console.debug('MongoDB connection opened!');
});

db.on('reconnected', () => {
  console.info('MongoDB reconnected');
});

db.on('disconnected', () => {
  console.warn(
    `MongoDB disconnected! Retry in ${config.reconnectInterval / 1000}s...`,
  );
  setTimeout(() => connect(), config.reconnectInterval);
});

connect()

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
