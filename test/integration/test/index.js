import path from 'path';

import { TestHelper } from 'fluxmaker/testing';

import createApplication from '../app/app';

const root = path.resolve(__dirname, '..');
const application = global.$app = createApplication({ env: 'test', root });
const testHelper = global.$testHelper = new TestHelper({ application });

before(() => testHelper.initialize());

afterEach(() => testHelper.factory.cleanup());
