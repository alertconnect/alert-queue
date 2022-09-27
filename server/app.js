require('dotenv').config();

// Init libs
const express = require('express');
const cron = require('./cron');

const app = express();

// Run cron job
cron.eventJob();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

module.exports = app;
