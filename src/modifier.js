import parser from 'ua-parser-js';
import getUserAgent from './useragent';

const OS = {
  macOS: 0,
  Windows: 1,
  other: 2
};

function getOS(currUseragent) {
  let ua = parser(currUseragent);
  switch (ua.os.name) {
    case 'Mac OS':
      return OS.macOS;
    case 'Windows':
      return OS.Windows;
    default:
      return OS.other;
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

function isKeyboardEvent(event) {
  return (event instanceof KeyboardEvent);
}

function isSimilarToKeyboardEvent(event) {
  return (event && event.hasOwnProperty('metaKey') && event.hasOwnProperty('ctrlKey') && event.hasOwnProperty('altKey'));
}

export default function Modifier(handler) {
  return (event, ...argv) => {
    return handler(modifier(event), ...argv);
  };
}

export function modifier(event) {
  if (!(isKeyboardEvent(event) || isSimilarToKeyboardEvent(event))) {
    throw new Error(`Expected to receive KeyboardEvent instead received ${event ? event.constructor.name : event}`);
  }
  const os = getOS(getUserAgent());
  event.primaryKey = ((os === OS.macOS && event.metaKey) || (os !== OS.macOS && event.ctrlKey));
  event.secondaryKey = event.altKey;
  return event;
}

// macOS modifier order: control, option, shift, command
// Windows modifier order: control alt shift
export function parse(key, options = {}) {
  const capitalizedKey = capitalize(key);
  const os = getOS(getUserAgent());
  return (os === OS.macOS)
    ? `${options.secondaryKey ? '⌥' : ''}${options.shiftKey ? '⇧' : ''}${options.primaryKey ? '⌘' : ''}${capitalizedKey}`
    : `${options.primaryKey ? 'Ctrl+' : ''}${options.secondaryKey ? 'Alt+' : ''}${options.shiftKey ? 'Shift+' : ''}${capitalizedKey}`;
}
