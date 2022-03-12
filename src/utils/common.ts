export const sleep = (timeout = 300) => {
  return new Promise((r) => {
    setTimeout(r, timeout);
  });
};
