const { PrismaClient } = require('@prisma/client');
const logger = require('../utils/logger');
const prisma = new PrismaClient();

/**
 * Query for sectors
 */
const querySectors = async () => await prisma.sector.findMany({});

/**
 * Find sector by geocode
 */
const findSectorByGeo = async (geocode) =>
  await prisma.sector.findUnique({
    where: {
      geo: geocode,
    },
  });

/**
 * Create new sectors
 */
const createSector = async (geocode, description) => {
  try {
    await prisma.sector.create({
      data: {
        geo: geocode,
        description,
      },
    });
  } catch (error) {
    logger.error(error);
    throw new Error('error generated while inserting on db');
  }
};

module.exports = {
  querySectors,
  findSectorByGeo,
  createSector,
};
