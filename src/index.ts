import dotenv from 'dotenv';

// Load environment variables first
dotenv.config();

// Validate environment variables (will exit if invalid)
import './config/env.js';

// Start the server
import './server.js';
