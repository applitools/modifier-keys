/* eslint-disable */
jest.mock('../src/useragent');
import getUserAgentMock from '../src/useragent';
import Modifier, { modifier, parse } from '../src/modifier';

describe('modifier macOS', () => {
  it('should treat command as primary key', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    expect(modifier(event).primaryKey).toBeTruthy();
    expect(modifier(event).secondaryKey).toBeFalsy();
  });
  it('should treat options as secondary key', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    let event = new KeyboardEvent('keydown', {'key': 'c', 'altKey': true});
    expect(modifier(event).primaryKey).toBeFalsy();
    expect(modifier(event).secondaryKey).toBeTruthy();
  });
});

describe('modifier Windows', () => {
  it('should treat control as primary key', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    let event = new KeyboardEvent('keydown', {'key': 'c', 'ctrlKey': true});
    expect(modifier(event).primaryKey).toBeTruthy();
    expect(modifier(event).secondaryKey).toBeFalsy();
  });
  it('should treat alt as secondary key', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    let event = new KeyboardEvent('keydown', {'key': 'c', 'altKey': true});
    expect(modifier(event).primaryKey).toBeFalsy();
    expect(modifier(event).secondaryKey).toBeTruthy();
  });
});

describe('modifier Linux', () => {
  it('should treat control as primary key', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36");
    let event = new KeyboardEvent('keydown', {'key': 'c', 'ctrlKey': true});
    expect(modifier(event).primaryKey).toBeTruthy();
    expect(modifier(event).secondaryKey).toBeFalsy();
  });
  it('should treat alt as secondary key', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2227.0 Safari/537.36");
    let event = new KeyboardEvent('keydown', {'key': 'c', 'altKey': true});
    expect(modifier(event).primaryKey).toBeFalsy();
    expect(modifier(event).secondaryKey).toBeTruthy();
  });
});

describe('modifier closure', () => {
  it('should add the primary key to the event handler', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    function EventHandler(e) {
      return e;
    }
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    expect(Modifier(EventHandler)(event).primaryKey).toBeTruthy();
  });
  it('should concat the rest of the arguments to the event handler', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    function EventHandler() {
      return arguments;
    }
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    let args = [event, 1, 2, 3];
    let result = Modifier(EventHandler)(...args);
    expect(result.length).toBe(args.length);
    expect([...result]).toEqual(args);
  });
  it('should keep the handler\'s context', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    let event = new KeyboardEvent('keydown', {'key': 'c', 'metaKey': true});
    let context = {};
    function EventHandler() {
      return this;
    }
    let handler = EventHandler.bind(context);
    expect(Modifier(handler)(event)).toBe(context);
  });
  it('should throw an error if no event was sent', () => {
    expect(() => Modifier(new Function)()).toThrowError('Expected to receive KeyboardEvent instead received undefined');
  });
  it('should throw an error if other type was sent', () => {
    expect(() => Modifier(new Function)(1)).toThrowError('Expected to receive KeyboardEvent instead received Number');
  });
  it('should throw an error if wrong type of event was sent', () => {
    let event = new MouseEvent('click');
    expect(() => Modifier(new Function)(event)).toThrowError('Expected to receive KeyboardEvent instead received MouseEvent');
  });
  it('should accept an object similar to KeyboardEvent', () => {
    const mockEvent = {
      metaKey: true,
      ctrlKey: false,
      altKey: false
    };
    expect(() => Modifier(new Function)(mockEvent)).not.toThrow();
  });
});

describe('key parser', () => {
  it('should capitalize the key', () => {
    expect(parse('c')).toBe('C');
  });
  it('should use the correct macOS primary and secondary keys', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    expect(parse('c', { primaryKey: true })).toBe('⌘C');
    expect(parse('c', { secondaryKey: true })).toBe('⌥C');
  });
  it('should use order the keys in macOS as <secondary><primary><key>', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    expect(parse('c', { primaryKey: true, secondaryKey: true })).toBe('⌥⌘C');
  });
  it('should use the correct primary and secondary keys for others', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    expect(parse('c', { primaryKey: true })).toBe('Ctrl+C');
    expect(parse('c', { secondaryKey: true })).toBe('Alt+C');
  });
  it('should use order the keys in all others as <primary><secondary><key>', () => {
    getUserAgentMock.mockReturnValue("Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3235.0 Safari/537.36");
    expect(parse('c', { primaryKey: true, secondaryKey: true })).toBe('Ctrl+Alt+C');
  });
});
