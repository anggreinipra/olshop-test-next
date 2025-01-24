// src/mocks/browser.ts
import { setupServer } from 'msw/node'; // Ganti setupWorker dengan setupServer
import { handlers } from './handlers';

export const server = setupServer(...handlers);
