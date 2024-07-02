const app = require("./index");


describe('GET /mean', () => {
    test('should return the mean of given numbers', async () => {
        const response = await request(app).get('/mean?nums=1,3,5,7');
        expect(response.statusCode). toBe(200);
        expect(response.body).toEqual({ operation: 'mean', value: 4});
    });

    test('should return 400 for invalud numbers', async () => {
        const response = await request(app).get('/mean?nums=foo,2,3');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({error: 'foo is not a number'});
    });

    test('should return 400 for empty input', async () => {
        const response = await request(app).get('/mean');
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({error: 'nums are required'});
    });
});

describe('GET /median', () => {
    test('should return the median of given numbers', async () => {
      const response = await request(app).get('/median?nums=1,3,5,7');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ operation: 'median', value: 4 });
    });
  
    test('should return 400 for invalid numbers', async () => {
      const response = await request(app).get('/median?nums=foo,2,3');
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'foo is not a number' });
    });
  
    test('should return 400 for empty input', async () => {
      const response = await request(app).get('/median');
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'nums are required' });
    });
  });
  
  describe('GET /mode', () => {
    test('should return the mode of given numbers', async () => {
      const response = await request(app).get('/mode?nums=1,3,3,5,7');
      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ operation: 'mode', value: [3] });
    });
  
    test('should return 400 for invalid numbers', async () => {
      const response = await request(app).get('/mode?nums=foo,2,3');
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'foo is not a number' });
    });
  
    test('should return 400 for empty input', async () => {
      const response = await request(app).get('/mode');
      expect(response.statusCode).toBe(400);
      expect(response.body).toEqual({ error: 'nums are required' });
    });
  });