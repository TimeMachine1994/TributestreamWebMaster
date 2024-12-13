import { setupServer, SetupServerApi } from 'msw/node';
import { handlers } from './handlers';
import { browser, dev } from '$app/env';

let worker: SetupServerApi | null;
if (!browser && dev) {
  worker = setupServer(...handlers);
} else {
  worker = null;
}

export { worker };