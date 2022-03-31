const CHARACTER = 'abcdef0123456789';

export const makeHash = (length: number): string =>
  Array.from({ length }).reduce(
    (acc: string, _) => acc + CHARACTER[Math.floor(Math.random() * CHARACTER.length)],
    ''
  ) as string;
