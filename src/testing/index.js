import Promise from 'bluebird';

import factory from './factory';
import loadFactories from './loadFactories';

import cleanDatabase from '../database/cleanDatabase';

class TestSuite {
  constructor({ application }) {
    this.application = application;
  }

  initialize() {
    return this.application.initialize()
      .then(() => Promise.resolve(this.loadFactories()))
      .catch((e) => {
        throw e;
      });
  }

  cleanDatabase() {
    return cleanDatabase(this.application).catch((e) => {
      throw e;
    });
  }

  loadFactories() {
    return loadFactories(this.application, factory);
  }
}

export {
  factory,
  TestSuite
};

export default TestSuite;
