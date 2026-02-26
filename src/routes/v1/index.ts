import { Router } from 'express';
import { createUserRouter } from './users.js';

export function createV1Router() {
  const v1Router = Router();

  // Mount resource routes
  v1Router.use('/users', createUserRouter());

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
