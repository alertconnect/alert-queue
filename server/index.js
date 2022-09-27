const app = require('./app');

const server = app.listen(3000, () => {
  console.info(`Listening to port ${3000}`);
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.info('Server closed');
    });
  }
};

const unexpectedErrorHandler = (error) => {
  console.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  console.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
