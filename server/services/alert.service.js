const dayjs = require('dayjs');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Find current active events by geo code
 * @param geo
 * @returns {Promise<Query<Array<EnforceDocument<unknown, {}>>, Document<any, any, unknown>, {}, unknown>>}
 */
const findCurrentAlert = async (geo) => {
  const currentTime = dayjs().toISOString();
  return prisma.event.findMany({
    where: {
      geo,
      expires: { gte: currentTime },
    },
  });
};

module.exports = {
  findCurrentAlert,
};
