import { expect } from 'chai';

describe('SequelizePlugin', () => {
  it('should load database', () => {
    expect($app.database).to.be.an.instanceof(Object);
  });

  it('should load models', () => {
    expect($app.models).to.be.an.instanceof(Object);
  });
});
