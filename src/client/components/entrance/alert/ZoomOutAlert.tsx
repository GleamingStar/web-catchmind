import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { zoomOutAlertAtom } from 'client/atom/miscAtom';
import { PORTRAIT_WIDTH } from 'shared/constant';

const RATIO = visualViewport.width / PORTRAIT_WIDTH;

const ZoomOutAlertWrapper = styled.div``;
const ParagraphWrapper = styled.div<{ isActivated: boolean }>`
  position: fixed;
  top: ${RATIO * 15}px;
  left: ${RATIO * 250}px;
  padding: ${RATIO * 10}px;
  border-radius: 10px;
  border: solid 2px #cdb699;

  font-size: ${RATIO * 15}px;
  transform: ${({ isActivated }) => `translate(-50%, ${isActivated ? 0 : -105 * RATIO}px)`};
  transition: transform 1.2s ease-out;
`;
const Paragraph = styled.div`
  color: #596e79;
  white-space: nowrap;
  & + & {
    margin-top: 5px;
  }
`;
const GestureWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  color: #733c3c;

  opacity: ${({ isActivated }) => (isActivated ? 0.99 : 0)};

  transition: opacity 1.2s ease-out;
`;
const ArrowLeftWrapper = styled.div`
  position: absolute;
  top: calc(calc(var(--vh, 1vh) * 100 - 240px) * ${RATIO});
  left: ${RATIO * 20}px;
  transform: rotate(-50deg);

  @keyframes zoomoutleft {
    50% {
      transform: translate(150%, -250%) rotate(-50deg);
    }
  }

  animation: 2s ease-in-out 0s infinite zoomoutleft;
`;
const ArrowRightWrapper = styled.div`
  position: absolute;
  top: ${RATIO * 140}px;
  left: ${RATIO * 420}px;
  transform: rotate(130deg);

  @keyframes zoomoutright {
    50% {
      transform: translate(-150%, 250%) rotate(130deg);
    }
  }

  animation: 2s ease-in-out 0s infinite zoomoutright;
`;

const ZoomOutAlert = () => {
  const isActivated = useRecoilValue(zoomOutAlertAtom);

  return (
    <ZoomOutAlertWrapper>
      <ParagraphWrapper isActivated={isActivated}>
        <Paragraph>이 사이트는 모바일 환경에서 가로 {PORTRAIT_WIDTH}px에 맞춰 설계되었습니다.</Paragraph>
        <Paragraph>화면을 축소해 원치않는 스크롤을 방지해주세요.</Paragraph>
        <Paragraph>그림을 그리는 과정에서 성능 저하가 발생할 수 있습니다.</Paragraph>
      </ParagraphWrapper>
      <Gesture />
    </ZoomOutAlertWrapper>
  );
};

const Gesture = () => {
  const isActivated = useRecoilValue(zoomOutAlertAtom);

  return (
    <GestureWrapper isActivated={isActivated}>
      <ArrowLeftWrapper>
        <Arrow />
      </ArrowLeftWrapper>
      <ArrowRightWrapper>
        <Arrow />
      </ArrowRightWrapper>
    </GestureWrapper>
  );
};

const Arrow = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={RATIO * 50}
    height={RATIO * 50}
    fill="currentColor"
    className="bi bi-arrow-right"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
    />
  </svg>
);

export default ZoomOutAlert;
