import request from 'supertest';

import app from '../src/app';

describe('routes', () => {
  describe('/', () => {
    it('should respond correctly', async () => {
      const resp = await request(app.callback()).get('/v1');
      expect(resp.status).toBe(200);
      expect(resp.body).toEqual({ msg: 'boilerplate - simple node web service' });
      expect(resp.type).toBe('application/json');
    });
  });
});
