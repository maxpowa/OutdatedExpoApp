// Consider this file a black-box, you should pretend it doesn't exist and you don't know anything about the implementation other than the exported API.

export type RegistrationId = NodeJS.Timeout;

export const register = (
  callback: () => void,
  interval: number,
): RegistrationId => {
  return setInterval(callback, 1000 * interval);
};

export const deregister = (id: RegistrationId) => {
  return clearInterval(id);
};
