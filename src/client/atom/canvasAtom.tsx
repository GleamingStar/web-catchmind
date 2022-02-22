import { atom } from 'recoil';

export const contextAtom = atom<CanvasRenderingContext2D>({
  key: 'canvas',
  default: null,
});

export const toolAtom = atom<'pencil' | 'eraser'>({
  key: 'tool',
  default: 'pencil',
});

export const colorAtom = atom({
  key: 'color',
  default: 'black',
});
