const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Query for sectors
 */
const querySectors = async () =>
  await prisma.sector.findMany({
    where: {},
  });

module.exports = {
  querySectors,
};
