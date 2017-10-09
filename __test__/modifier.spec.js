/* eslint-disable */
import modifier from '../src/modifier';

describe('modifier closure', () => {
  it('should treat command as primary key', () => {
    let event = new KeyboardEvent('keydown', {'keyCode': 37});
    expect(modifier(event).withPrimaryKey).toBeTruthy();
  });
});
