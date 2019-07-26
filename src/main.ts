import 'reflect-metadata';

import { KoaInversifyApplication } from 'koa-ioc-utils';

import appBase from './app';
import container from './container';

import '@/controllers';
import { CustomKoaContext } from './types';

const port: number = Number(process.env.PORT) || 4000;

new KoaInversifyApplication<CustomKoaContext>(container, appBase).run(port);
