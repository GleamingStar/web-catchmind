import styled from 'styled-components';
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { isPortraitAtom } from 'client/atom/miscAtom';
import { MAX_GAME_ROUND } from 'shared/constant';

const RoundPerGameWrapper = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
`;
const Title = styled.div`
  margin-right: 10px;
`;
const Count = styled.div`
  margin-left: 10px;
  font-size: 18px;
`;

const RoundPerGame = () => {
  const isPortrait = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(isPortraitAtom);
  return (
    <RoundPerGameWrapper>
      {isPortrait || <Title>게임당 진행 라운드</Title>}
      <Easel />
      <Count>{MAX_GAME_ROUND}라운드</Count>
    </RoundPerGameWrapper>
  );
};

const Easel = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="currentColor"
    className="bi bi-easel2"
    viewBox="0 0 16 16"
  >
    <path
      fillRule="evenodd"
      d="M8 0a.5.5 0 0 1 .447.276L8.81 1h4.69A1.5 1.5 0 0 1 15 2.5V11h.5a.5.5 0 0 1 0 1h-2.86l.845 3.379a.5.5 0 0 1-.97.242L12.11 14H3.89l-.405 1.621a.5.5 0 0 1-.97-.242L3.36 12H.5a.5.5 0 0 1 0-1H1V2.5A1.5 1.5 0 0 1 2.5 1h4.691l.362-.724A.5.5 0 0 1 8 0ZM2 11h12V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5V11Zm9.61 1H4.39l-.25 1h7.72l-.25-1Z"
    />
  </svg>
);

export default RoundPerGame;
