import { expect } from 'chai';
import { stub } from 'sinon';

import Promise from 'bluebird';

import Application from '../../../src/application/application';

describe('Application', () => {
  let application;

  before(() => {
    stub(Application.prototype, 'loadConfigs');
  });

  after(() => {
    Application.prototype.loadConfigs.restore();
  });

  describe('#constructor', () => {
    before(() => {
      application = new Application({
        env: 'test',
        root: __dirname
      }, {
        flux: {},
        server: {}
      });
    });

    it('should call #loadConfigs', () => {
      expect(Application.prototype.loadConfigs).to.have.been.calledOnce;
    });

    it('should have an array of plugins', () => {
      expect(application.plugins).to.be.an.instanceof(Array);
    });
  });

  describe('#initialize', () => {
    before(() => {
      application = new Application({
        env: 'test',
        root: __dirname
      }, {
        flux: {},
        server: {}
      });
    });

    it('should return a promise', () => {
      expect(application.initialize()).to.be.an.instanceof(Promise);
    });
  });
});
