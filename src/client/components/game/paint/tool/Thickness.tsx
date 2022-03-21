import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { BsBorderWidth } from 'react-icons/bs';
import { isThicknessOnSelector, thicknessAtom, toggleCanvasModalAtom } from 'client/atom/canvasAtom';
import { isPortraitAtom } from 'client/atom/miscAtom';

const OverflowWrapper = styled.div<{ isActivated: boolean }>`
  width: ${({ isActivated }) => `${isActivated ? 218 : 32}px`};
  border-radius: 10px;
  background-color: ${({ isActivated }) => `${isActivated ? '#e6ddc4' : '#dfd3c3'}`};

  overflow: hidden;

  &:hover {
    background-color: #e6ddc4;
    filter: ${({ isActivated }) => `opacity(${isActivated ? 100 : 40}%)`};
  }

  transition: width 0.8s, background-color 0.5s, filter 0.5s;
`;
const PortraitWrapper = styled.div`
  width: 180px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ThicknessWrapper = styled.div<{ isActivated: boolean }>`
  width: 218px;
  height: 30px;
  padding: 8px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  overflow: hidden;

  cursor: ${({ isActivated }) => (isActivated ? 'default' : 'pointer')};
`;
const LineWrapper = styled.div<{ isSelected: boolean }>`
  width: 16px;
  height: 16px;

  display: flex;
  justify-content: center;
  align-items: center;

  filter: ${({ isSelected }) => `opacity(${isSelected ? 20 : 100}%)`};

  &:hover {
    filter: opacity(40%);
  }

  transition: filter 0.25s;

  cursor: pointer;
`;
const LineContent = styled.div<{ height: number }>`
  width: 16px;
  height: ${({ height }) => `${height}px`};
  background-color: #000;
  transform: rotate(135deg);
  border-radius: 8px;
`;

const Thickness = () => {
  const toggle = useSetRecoilState(toggleCanvasModalAtom);
  const isActivated = useRecoilValue(isThicknessOnSelector);
  const isPortrait = useRecoilValue(isPortraitAtom);

  const lines = [1, 2, 4, 6, 8, 16].map((e) => <Line key={e} height={e} />);

  return isPortrait ? (
    <PortraitWrapper>{lines}</PortraitWrapper>
  ) : (
    <OverflowWrapper isActivated={isActivated}>
      <ThicknessWrapper isActivated={isActivated} onClick={() => toggle(0)}>
        <BsBorderWidth />
        {lines}
      </ThicknessWrapper>
    </OverflowWrapper>
  );
};

const Line = ({ height }: { height: number }) => {
  const [thickness, setThickness] = useRecoilState(thicknessAtom);

  return (
    <LineWrapper onClick={() => setThickness(height)} isSelected={height === thickness}>
      <LineContent height={height} />
    </LineWrapper>
  );
};

export default Thickness;
