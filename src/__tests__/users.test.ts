import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';

describe('User API', () => {
  const app = createApp();

  describe('GET /api/v1/users', () => {
    it('should return empty array initially', async () => {
      const response = await request(app).get('/api/v1/users');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user', async () => {
      const newUser = {
        name: 'John Doe',
        email: 'john@example.com',
      };

      const response = await request(app)
        .post('/api/v1/users')
        .send(newUser);
      
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(newUser.name);
      expect(response.body.email).toBe(newUser.email);
    });

    it('should validate required fields', async () => {
      const response = await request(app)
        .post('/api/v1/users')
        .send({});
      
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error', 'Validation failed');
    });

    it('should validate email format', async () => {
      const response = await request(app)
        .post('/api/v1/users')
        .send({
          name: 'John Doe',
          email: 'invalid-email',
        });
      
      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Validation failed');
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return 404 for non-existent user', async () => {
      const response = await request(app).get('/api/v1/users/999');
      
      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error', 'User not found');
    });
  });
});
