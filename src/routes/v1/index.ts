import { Router } from 'express';
import { createUserRouter } from './users.js';
import type { Cradle } from '../../config/container.js';

export function createV1Router(container: { cradle: Cradle }) {
  const v1Router = Router();

  // Mount resource routes
  v1Router.use('/users', createUserRouter(container));

  // V1 API root
  v1Router.get('/', (req, res) => {
    res.json({
      version: 'v1',
      endpoints: {
        users: '/api/v1/users',
      }
    });
  });

  return v1Router;
}
