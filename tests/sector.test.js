const request = require('supertest');
const app = require('../server/app');

describe('Sector Endpoints', () => {
  it('should fetch sectors', async () => {
    const res = await request(app).get('/api/v1/sector');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result');
  });
});
