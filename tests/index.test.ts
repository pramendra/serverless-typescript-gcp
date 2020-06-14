import { Request } from 'jest-express/lib/request';
import { Response } from 'jest-express/lib/response';
const index = require('../src/index');

test('test http function', async () => {
  const req: any = new Request();
  const res: any = new Response();
  await index.http(req, res);
  expect(res.statusCode).toBe(200);
  expect(res.body).toBe('Hello World!');
});
