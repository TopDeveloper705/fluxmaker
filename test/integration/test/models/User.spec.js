import { expect } from 'chai';

describe('User', () => {
  let user;

  before(() => {
    return $testHelper.factory.create('user')
      .then((_user) => user = _user);
  });

  afterEach(() => $testHelper.cleanDatabase());

  it('should check user\'s email', () => {
    expect(user.email).to.contain('@');
  });
});
