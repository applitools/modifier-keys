export default function Modifier(handler) {
  return (event, ...argv) => {
    return handler(modifier(event), ...argv);
  };
}

export function modifier(event) {
  return event;
}
