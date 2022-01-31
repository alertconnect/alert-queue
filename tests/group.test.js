const request = require('supertest');
const app = require('../server/app');

describe('Group Endpoints', () => {
  it('should fetch group', async () => {
    const res = await request(app).get('/api/v1/group');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('result');
  });
  it('should create a new group', async () => {
    const res = await request(app).post('/api/v1/group').send({
      id: 1,
      chatId: 'chatId',
      title: 'title',
      type: 'type',
      geo: 'geo',
    });
    expect(res.statusCode).toEqual(201);
  });
  it('should return a group by chatId', async () => {
    const chatId = 1;
    const res = await request(app).get(`/api/v1/group/${chatId}`);
    expect(res.statusCode).toEqual(200);
  });
  it('should update a group by chatId', async () => {
    const chatId = 1;
    const res = await request(app).put(`/api/v1/group/${chatId}`).send({
      chatId: 'chatId',
      title: 'updated title',
      type: 'type',
      geo: 'geo',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.post).toHaveProperty('title', 'updated title');
  });
  it('should delete a group by chatId', async () => {
    const chatId = 1;
    const res = await request(app).delete(`/api/v1/group/${chatId}`);
    expect(res.statusCode).toEqual(204);
  });
});
