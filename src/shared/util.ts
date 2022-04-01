const CHARACTER = 'abcdef0123456789';

export const makeHash = (length: number): string =>
  Array.from({ length }).reduce(
    (acc: string, _) => acc + CHARACTER[Math.floor(Math.random() * CHARACTER.length)],
    ''
  ) as string;

export const debounce = (callback: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => callback(...args), delay);
  };
};

export const throttle = (callback: Function, delay: number) => {
  let isWaiting = true;

  return (...args) => {
    if (!isWaiting) return;
    isWaiting = false;
    callback(...args);
    setTimeout(() => (isWaiting = true), delay);
  };
};
