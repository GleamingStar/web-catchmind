import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { colorAtom, isPaletteOnSelector, toggleCanvasModalAtom, toolAtom } from 'client/atom/canvasAtom';
import { COLOR } from 'shared/constant';
import { isPortraitAtom } from 'client/atom/miscAtom';
import ColorSelector from './ColorSelector';

const OverflowWrapper = styled.div<{ isActivated: boolean }>`
  width: ${({ isActivated }) => `${isActivated ? 250 : 32}px`};
  border-radius: 10px;
  background-color: ${({ isActivated }) => `${isActivated ? '#e6ddc4' : '#dfd3c3'}`};

  overflow: hidden;

  @media (hover: hover) {
    &:hover {
      background-color: #e6ddc4;
      filter: ${({ isActivated }) => `opacity(${isActivated ? 100 : 40}%)`};
    }
  }

  transition: width 0.8s, background-color 0.5s, filter 0.5s;
`;
const PortraitWrapper = styled.div`
  width: 180px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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
const Color = styled.div<{ color: string; isSelected: boolean }>`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border-radius: 50%;

  filter: ${({ isSelected }) => `opacity(${isSelected ? 20 : 100}%)`};

  @media (hover: hover) {
    &:hover {
      filter: opacity(40%);
    }
  }

  transition: filter 0.25s;

  cursor: pointer;
`;

const Palette = () => {
  const setTool = useSetRecoilState(toolAtom);
  const toggle = useSetRecoilState(toggleCanvasModalAtom);
  const isActivated = useRecoilValue(isPaletteOnSelector);
  const [currentColor, setColor] = useRecoilState(colorAtom);
  const isPortrait = useRecoilValue(isPortraitAtom);

  const colors = COLOR.map((color) => (
    <Color
      key={color}
      color={color}
      isSelected={color === currentColor}
      onClick={() => {
        setTool('pencil');
        setColor(color);
      }}
    />
  ));

  return isPortrait ? (
    <PortraitWrapper>{colors}</PortraitWrapper>
  ) : (
    <OverflowWrapper isActivated={isActivated}>
      <PaletteWrapper isActivated={isActivated} onClick={() => toggle(1)}>
        <PaletteIcon color={currentColor} />
        {colors}
        <ColorSelector />
      </PaletteWrapper>
    </OverflowWrapper>
  );
};


const PaletteIcon = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill={color}
    className="bi bi-palette"
    viewBox="0 0 16 16"
  >
    <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
    <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z" />
  </svg>
);

export default Palette;
