import path from 'path';

import { TestSuite } from 'fluxmaker/testing';

import createApplication from '../app/app';

const root = path.resolve(__dirname, '..');
const application = global.$app = createApplication({ env: 'test', root });
const testSuite = global.$testSuite = new TestSuite({ application });

before(() => testSuite.initialize());
