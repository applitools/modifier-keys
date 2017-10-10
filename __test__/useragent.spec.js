/* eslint-disable */
import getUserAgent from '../src/useragent';

describe('useragent', () => {
  it('should return the global useragent', () => {
    expect(getUserAgent()).toEqual(global.window.navigator.userAgent);
  });
});
