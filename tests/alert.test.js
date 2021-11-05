const request = require('supertest');
const app = require('../server/app');

describe('Alert Endpoints', () => {
  it('should fetch alert', async () => {
    const res = await request(app).get('/api/v1/alert?geo=Lomb-09');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result');
  });
  it('should respond with status code 400 if geo code is missing', async () => {
    const res = await request(app).get('/api/v1/alert');
    expect(res.statusCode).toEqual(400);
  });
  it('refresh alert data from national server', async () => {
    const res = await request(app).post('/api/v1/alert/refresh').send({});
    expect(res.statusCode).toEqual(200);
  });
});
