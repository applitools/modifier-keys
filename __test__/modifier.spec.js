/* eslint-disable */
import modifier from '../src/modifier';

describe('modifier macOS', () => {
  it('should treat command as primary key', () => {
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    expect(modifier(event).primaryKey).toBeTruthy();
    expect(modifier(event).secondaryKey).toBeFalsey();
  });
  it('should treat options as secondary key', () => {
    let event = new KeyboardEvent('keydown', {'key': 'c', 'altKey': true});
    expect(modifier(event).primaryKey).toBeFalsey();
    expect(modifier(event).secondaryKey).toBeTruthy();
  });
});
