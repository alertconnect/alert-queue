const path = require('path');
const dayjs = require('dayjs');
const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();
const logger = require('../utils/logger');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const EXTRACTION_PATH = './uploads/ext/';

/**
 * Delete all events on db
 * @returns {Promise<void>}
 */
const cleanEvents = async () => {
  await prisma.event.deleteMany({});
};

/**
 * Delete all expired events
 * @returns {Promise<void>}
 */
const deleteExpiredEvent = async () => {
  logger.info('Delete all expired events in progress');
  const currentTime = dayjs().toISOString();
  await prisma.event.deleteMany({
    where: { expires: { lte: currentTime } },
  });
};

const extension = async (element, extension = 'xml') => {
  const extName = path.extname(element);
  return extName === '.' + extension;
};

const eventCode = (event) => {
  const geo = new RegExp('\\bIDROGEOLOGICO\\b');
  const hydro = new RegExp('\\bIDRAULICO\\b');
  const storm = new RegExp('\\bTEMPORALI\\b');
  if (hydro.test(event)) {
    return 'hydro';
  } else if (geo.test(event)) {
    return 'geo';
  } else if (storm.test(event)) {
    return 'storm';
  }
  return 'error';
};

const updateEventData = async () => {
  logger.info('updateEventData started');
  fs.readdir(EXTRACTION_PATH, (err, list) => {
    list.filter(extension).forEach((value) => {
      const reg = new RegExp('^Cap', 'i');
      if (reg.test(value)) {
        fs.readFile(`${EXTRACTION_PATH}${value}`, 'utf8', (err, uploads) => {
          parser.parseString(uploads, async (err, result) => {
            await cleanEvents();
            const alert = result.alert;
            const infoArray = result.alert.info;
            if (infoArray) {
              for (const info of infoArray) {
                const arealArray = info.area;
                console.log(arealArray);
                for (const area of arealArray) {
                  try {
                    await prisma.event.create({
                      data: {
                        geo: area.geocode[0].value.toString(),
                        type: eventCode(info.event.toString()),
                        description: area.areaDesc.toString() || '',
                        event: info.event.toString(),
                        urgency: info.urgency.toString(),
                        severity: info.severity.toString(),
                        certainty: info.certainty.toString(),
                        onset: info.onset.toString(),
                        expires: info.expires.toString(),
                        received: alert.sent.toString(),
                        identifier: alert.identifier.toString(),
                      },
                    });
                  } catch (error) {
                    logger.error(error);
                    throw new Error('error generated while inserting on db');
                  }
                }
              }
            } else {
              logger.info('No data available, Italy is safe!');
            }
          });
        });
      }
    });
  });

  logger.info('Update completed');
};

module.exports = {
  updateEventData,
  deleteExpiredEvent,
};
