// src/mocks/server.ts
import { setupServer } from 'msw/node'; // Import setupServer dari msw/node
import { handlers } from './handlers';

// Setup server untuk pengujian dengan Jest
export const server = setupServer(...handlers);
