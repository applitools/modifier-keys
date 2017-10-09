/* eslint-disable */
import Modifier, { modifier } from '../src/modifier';

describe('modifier macOS', () => {
  global.window = {
    navigator: {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36"
    }
  };
  it('should treat command as primary key', () => {
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    expect(modifier(event).primaryKey).toBeTruthy();
    expect(modifier(event).secondaryKey).toBeFalsy();
  });
  it('should treat options as secondary key', () => {
    let event = new KeyboardEvent('keydown', {'key': 'c', 'altKey': true});
    expect(modifier(event).primaryKey).toBeFalsy();
    expect(modifier(event).secondaryKey).toBeTruthy();
  });
});

describe('modifier Windows', () => {
  global.window = {
    navigator: {
      userAgent: "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36"
    }
  };
  it('should treat control as primary key', () => {
    let event = new KeyboardEvent('keydown', {'key': 'c', 'controlKey': true});
    expect(modifier(event).primaryKey).toBeTruthy();
    expect(modifier(event).secondaryKey).toBeFalsy();
  });
  it('should treat alt as secondary key', () => {
    let event = new KeyboardEvent('keydown', {'key': 'c', 'altKey': true});
    expect(modifier(event).primaryKey).toBeFalsy();
    expect(modifier(event).secondaryKey).toBeTruthy();
  });
});

describe('modifier closure', () => {
  global.window = {
    navigator: {
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36"
    }
  };
  it('should add the primary key to the event handler', () => {
    function EventHandler(e) {
      return e;
    }
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    expect(Modifier(EventHandler)(event).primaryKey).toBeTruthy();
  });
  it('should concat the rest of the arguments to the event handler', () => {
    function EventHandler() {
      return arguments;
    }
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    let args = [event, 1, 2, 3];
    let result = Modifier(EventHandler)(...args);
    expect(result.length).toBe(args.length);
    expect([...result]).toEqual(args);
  });
});
