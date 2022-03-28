import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { disconnectAlertAtom } from 'client/atom/miscAtom';

const DisconnectAlertWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;
  top: 50px;
  left: 50%;
  padding: 10px;
  border-radius: 12px;
  border: solid 2px #cdb699;
  transform: ${({ isActivated }) => `translate(-50%,${isActivated ? 0 : -140}px)`};

  transition: transform 1s ease-out;
`;
const Paragraph = styled.div`
  color: #596e79;
  white-space: nowrap;
  & + & {
    margin-top: 5px;
  }
`;

const DisconnectAlert = () => {
  const isDisconnected = useRecoilValue(disconnectAlertAtom);

  return (
    <DisconnectAlertWrapper isActivated={isDisconnected}>
      <Paragraph>소켓 연결이 종료되었습니다.</Paragraph>
      <Paragraph>네트워크 이상 혹은 업데이트를 위한 서버종료일 수 있습니다.</Paragraph>
      <Paragraph>문제가 지속될 시 우측하단 깃허브로 제보해주세요.</Paragraph>
    </DisconnectAlertWrapper>
  );
};

export default DisconnectAlert;
