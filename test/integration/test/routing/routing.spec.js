import { expect } from 'chai';

describe('Routing', () => {
  describe('home', () => {
    it('should have a greeting message', () => {
      return $testHelper.request()
        .get('/')
        .expect(200)
        .then((res) => {
          expect(res.text).to.contain('Welcome to the site!');
        });
    });
  });

  describe('about', () => {
    it('should have a description', () => {
      return $testHelper.request()
        .get('/about')
        .expect(200)
        .then((res) => {
          expect(res.text).to.contain('This is a description of the site.');
          expect(res.text).to.match(/It is .+ now\./);
        });
    });
  });
});
