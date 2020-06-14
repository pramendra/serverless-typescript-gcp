const request = require('supertest');
const index = require('../src/index');
const express = require('express');

const app = express();
app.use('/', index.http);

describe('GET /', () => {
  it('responds Hello World!', async (done) => {
    await request(app).get('/').expect(200, 'Hello World!');
    done();
  });
});

describe('GET /webhook', () => {
  it('responds webhook', async (done) => {
    await request(app).get('/webhook').expect(200, 'webhook');
    done();
  });
});
