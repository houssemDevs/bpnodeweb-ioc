import supertest from 'supertest';

import appBase from '@/app';

describe('routes', () => {
  describe('/', () => {
    it('should respond correctly', async () => {
      const resp = await supertest(appBase.callback()).get('/v1');
      expect(resp.status).toBe(404);
    });
  });
});
