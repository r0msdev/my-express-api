import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';

describe('Health Check', () => {
  const app = createApp();

  it('should return 200 and ok status', async () => {
    const response = await request(app).get('/health');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'ok');
    expect(response.body).toHaveProperty('timestamp');
  });

  it('should return ISO timestamp', async () => {
    const response = await request(app).get('/health');
    
    const timestamp = response.body.timestamp;
    expect(() => new Date(timestamp).toISOString()).not.toThrow();
  });
});

describe('API Root', () => {
  const app = createApp();

  it('should return API info', async () => {
    const response = await request(app).get('/api');
    
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Welcome to the API');
    expect(response.body).toHaveProperty('version', '1.0.0');
    expect(response.body).toHaveProperty('endpoints');
  });
});
