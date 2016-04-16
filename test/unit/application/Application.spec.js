import { expect } from 'chai';
import { stub } from 'sinon';

import Promise from 'bluebird';

import Application from '../../../src/application/Application';

describe('Application', () => {
  let application;
  let mockServer = {
    _server: {
      use: () => {}
    }
  };

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
        server: mockServer
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
        server: mockServer
      });
    });

    it('should return a promise', () => {
      application.plugins = [];
      expect(application.initialize()).to.be.an.instanceof(Promise);
    });
  });
});
