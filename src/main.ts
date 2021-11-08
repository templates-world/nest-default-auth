import { config as loadEnv } from 'dotenv';

loadEnv();

import('./server').then((server) => server.bootstrap());
