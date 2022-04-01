import { colorAtom } from 'client/atom/canvasAtom';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';

const SelectorWrapper = styled.div`
  position: relative;
  width: 16px;
  height: 16px;
  border-radius: 50%;

  @media (hover: hover) {
    &:hover {
      filter: opacity(40%);
    }
  }

  transition: filter 0.25s;
`;
const ColorInput = styled.input.attrs({ type: 'color' })`
  width: 16px;
  height: 16px;
  opacity: 0;
  cursor: pointer;
`;
const SelectorCircle = styled.div.attrs(({ color }) => ({
  style: { backgroundColor: color },
}))<{ color: string }>`
  position: absolute;
  left: 0px;
  bottom: 0px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  pointer-events: none;
`;
const DropperWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 1.5px;
  pointer-events: none;
`;

const ColorSelector = () => {
  const [currentColor, setColor] = useRecoilState(colorAtom);
  return (
    <SelectorWrapper>
      <ColorInput value={currentColor} onChange={({ target }) => setColor(target.value)} />
      <SelectorCircle color={currentColor} />
      <DropperIcon />
    </SelectorWrapper>
  );
};

const DropperIcon = () => (
  <DropperWrapper>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      fill="#493323"
      className="bi bi-eyedropper"
      viewBox="0 0 16 16"
    >
      <path d="M13.354.646a1.207 1.207 0 0 0-1.708 0L8.5 3.793l-.646-.647a.5.5 0 1 0-.708.708L8.293 5l-7.147 7.146A.5.5 0 0 0 1 12.5v1.793l-.854.853a.5.5 0 1 0 .708.707L1.707 15H3.5a.5.5 0 0 0 .354-.146L11 7.707l1.146 1.147a.5.5 0 0 0 .708-.708l-.647-.646 3.147-3.146a1.207 1.207 0 0 0 0-1.708l-2-2zM2 12.707l7-7L10.293 7l-7 7H2v-1.293z" />
    </svg>
  </DropperWrapper>
);

export default ColorSelector;
