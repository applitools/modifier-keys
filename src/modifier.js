import parser from 'ua-parser-js';
import useragent from './useragent';

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

export default function Modifier(handler) {
  return (event, ...argv) => {
    return handler(modifier(event), ...argv);
  };
}

export function modifier(event) {
  const os = getOS(useragent);
  event.primaryKey = ((os === OS.macOS && event.metaKey) || (os !== OS.macOS && event.ctrlKey));
  event.secondaryKey = event.altKey;
  return event;
}
