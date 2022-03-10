import styled from 'styled-components';
import { BsPalette } from 'react-icons/bs';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { colorAtom, contextAtom, isPaletteOnSelector, toggleCanvasModalAtom, toolAtom } from 'client/atom/canvasAtom';
import { COLOR } from 'shared/constant';

const OverflowWrapper = styled.div<{ isActivated: boolean }>`
  width: ${({ isActivated }) => `${isActivated ? 250 : 32}px`};
  border-radius: 10px;
  background-color: ${({ isActivated }) => `${isActivated ? '#e6ddc4' : '#dfd3c3'}`};
  
  overflow: hidden;
  
  &:hover {
    background-color: #e6ddc4;
    filter: ${({ isActivated }) => `opacity(${isActivated ? 100 : 40}%)`};
  }

  transition: width 0.8s, background-color 0.5s, filter 0.5s;
`;
const PaletteWrapper = styled.div<{ isActivated: boolean }>`
  position: relative;
  width: 250px;
  height: 30px;
  padding: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  overflow: hidden;

  cursor: ${({ isActivated }) => (isActivated ? 'default' : 'pointer')};
`;
const Color = styled.div<{ color: string }>`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border-radius: 50%;

  &:hover {
    filter: opacity(40%);
  }

  transition: filter 0.25s;

  cursor: pointer;
`;

const Palette = () => {
  const ctx = useRecoilValue(contextAtom);
  const setTool = useSetRecoilState(toolAtom);
  const toggle = useSetRecoilState(toggleCanvasModalAtom);
  const isActivated = useRecoilValue(isPaletteOnSelector);
  const [currentColor, setColor] = useRecoilState(colorAtom);

  return (
    <OverflowWrapper isActivated={isActivated}>
      <PaletteWrapper isActivated={isActivated} onClick={() => toggle(1)}>
        <BsPalette fill={currentColor} />
        {COLOR.map((color) => (
          <Color
            key={color}
            color={color}
            onClick={() => {
              setTool('pencil');
              setColor(color);
              ctx.globalCompositeOperation = 'source-over';
              ctx.strokeStyle = color;
            }}
          />
        ))}
      </PaletteWrapper>
    </OverflowWrapper>
  );
};

export default Palette;