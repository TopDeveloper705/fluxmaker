import { expect } from 'chai';

describe('Internals#plugins', () => {
  it('should have an array of plugins', () => {
    expect($app.plugins).to.be.an.instanceof(Array);
  });

  it('should have SequelizePlugin as first plugin', () => {
    expect($app.plugins[0].name).to.equal('SequelizePlugin');
  });
});
