import { atom, selector } from 'recoil';
import socket from 'client/config/socket';
import { CANVAS_SIZE, LANDSCAPE_WIDTH, PORTRAIT_WIDTH } from 'shared/constant';
import { TCanvas } from 'shared/types';

const isMobileChrome = /Chrome/g.test(navigator.userAgent) && /Mobile Safari/g.test(navigator.userAgent);

export const contextAtom = atom<CanvasRenderingContext2D>({
  key: 'canvasContext',
  default: null,
  effects: [
    ({ onSet }) => {
      onSet((ctx) => {
        socket.off('canvas/draw');
        socket.off('canvas/reset');
        socket.off('canvas/update/response');

        socket.on('canvas/draw', ({ tool, thickness, color, location }: TCanvas) => {
          const { x0, y0, x1, y1 } = location;
          ctx.beginPath();
          ctx.moveTo(x0, y0);
          ctx.lineTo(x1, y1);
          ctx.globalCompositeOperation = tool === 'pencil' ? 'source-over' : 'destination-out';
          ctx.lineWidth = thickness;
          ctx.strokeStyle = color;
          ctx.stroke();
          ctx.closePath();
        });

        const reset = () => ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        const mobileChromeReset = () => {
          reset();
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, 0);
          ctx.globalCompositeOperation = 'destination-out';
          ctx.stroke();
          ctx.closePath();
        };

        const resetHandler = isMobileChrome ? mobileChromeReset : reset;

        socket.on('canvas/reset', resetHandler);

        socket.on('canvas/update/response', (canvas: string) => {
          const img = new Image();
          img.onload = () => ctx.drawImage(img, 0, 0);
          img.src = canvas;
          socket.off('canvas/update/response');
        });
        socket.emit('canvas/update/request');
      });
    },
  ],
});

const width = window.innerWidth;
const defaultLeftSpace =
  width > LANDSCAPE_WIDTH ? (width - LANDSCAPE_WIDTH) / 2 : width > PORTRAIT_WIDTH ? (width - PORTRAIT_WIDTH) / 2 : 0;

export const leftSpaceAtom = atom({
  key: 'leftSpace',
  default: defaultLeftSpace,
});

export const toolAtom = atom<'pencil' | 'eraser'>({
  key: 'tool',
  default: 'pencil',
  effects: [
    ({ resetSelf }) => {
      socket.on('game/set/start', resetSelf);

      return () => {
        socket.off('game/set/start', resetSelf);
      };
    },
  ],
});

export const thicknessAtom = atom({
  key: 'thickness',
  default: 2,
});

export const colorAtom = atom({
  key: 'color',
  default: '#000000',
});

const pencilInlineSVG = (color: string) =>
  `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='%23${color.slice(
    1
  )}' class='bi bi-pencil' viewBox='0 0 16 16'%3E%3Cpath d='M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z'/%3E%3C/svg%3E`;
const eraserInlineSVG =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-eraser' viewBox='0 0 16 16'%3E%3Cpath d='M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z'/%3E%3C/svg%3E";

export const cursorSelector = selector({
  key: 'cursor',
  get: ({ get }) => (get(toolAtom) === 'pencil' ? pencilInlineSVG(get(colorAtom)) : eraserInlineSVG),
});

export const toggleCanvasModalAtom = atom<number>({
  key: 'toggleCanvasModal',
  default: 1,
});

export const isThicknessOnSelector = selector<boolean>({
  key: 'isThicknessOn',
  get: ({ get }) => get(toggleCanvasModalAtom) === 0,
});

export const isPaletteOnSelector = selector<boolean>({
  key: 'isPaletteOn',
  get: ({ get }) => get(toggleCanvasModalAtom) === 1,
});
