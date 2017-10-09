/* eslint-disable */
import Modifier, { modifier } from '../src/modifier';

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

describe('modifier Windows', () => {
  it('should treat control as primary key', () => {
    let event = new KeyboardEvent('keydown', {'key': 'c', 'controlKey': true});
    expect(modifier(event).primaryKey).toBeTruthy();
    expect(modifier(event).secondaryKey).toBeFalsey();
  });
  it('should treat alt as secondary key', () => {
    let event = new KeyboardEvent('keydown', {'key': 'c', 'altKey': true});
    expect(modifier(event).primaryKey).toBeFalsey();
    expect(modifier(event).secondaryKey).toBeTruthy();
  });
});

describe('modifier closure', () => {
  it('should add the primary key to the event handler', () => {
    function EventHandler(e) {
      return e;
    }
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    expect(Modifier(EventHandler)(event).primaryKey).toBeTruthy();
  });
  it('should concat the rest of the arguments to the event handler', () => {
    function EventHandler() {
      return arguments.length;
    }
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    let args = [event, 1, 2, 3];
    expect(Modifier(EventHandler)(...args)).toBe(args.length);
  });
});
