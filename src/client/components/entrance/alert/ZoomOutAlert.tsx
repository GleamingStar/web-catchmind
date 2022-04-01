import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { zoomOutAlertAtom } from 'client/atom/miscAtom';
import { PORTRAIT_WIDTH } from 'shared/constant';

const ratio = visualViewport.width / PORTRAIT_WIDTH;

const ZoomOutAlertWrapper = styled.div<{ isActivated: boolean }>`
  position: fixed;
  top: ${ratio * 15}px;
  left: ${ratio * 250}px;
  padding: ${ratio * 10}px;
  border-radius: 10px;
  border: solid 2px #cdb699;

  font-size: ${ratio * 15}px;

  transform: ${({ isActivated }) => `translate(-50%, ${isActivated ? 0 : -105 * ratio}px)`};

  transition: transform 0.8s ease-out;
`;
const Paragraph = styled.div`
  color: #596e79;
  white-space: nowrap;
  & + & {
    margin-top: 5px;
  }
`;

const ZoomOutAlert = () => {
  const isActivated = useRecoilValue(zoomOutAlertAtom);

  return (
    <ZoomOutAlertWrapper isActivated={isActivated}>
      <Paragraph>이 사이트는 모바일 환경에서 가로 {PORTRAIT_WIDTH}px에 맞춰 설계되었습니다.</Paragraph>
      <Paragraph>화면을 축소해 원치않는 스크롤을 방지해주세요.</Paragraph>
      <Paragraph>그림을 그리는 과정에서 성능 저하가 발생할 수 있습니다.</Paragraph>
    </ZoomOutAlertWrapper>
  );
};

export default ZoomOutAlert;
