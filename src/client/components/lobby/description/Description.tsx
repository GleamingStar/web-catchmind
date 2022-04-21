import styled from 'styled-components';
import { useRecoilValue_TRANSITION_SUPPORT_UNSTABLE } from 'recoil';
import { isPortraitAtom } from 'client/atom/miscAtom';
import { ANSWER_SCORE, DRAWING_SCORE, MAX_GAME_ROUND } from 'shared/constant';
import RoundPerGame from './RoundPerGame';
import TimerPerSet from './TimerPerSet';
import UserCount from './UserCount';

const DescriptionWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  color: #596e79;
`;
const DetailWrapper = styled.div`
  width: 400px;
  margin-top: 25px;
`;
const DetailParagraph = styled.div`
  font-size: 14px;
  & + & {
    margin-top: 15px;
  }
`;

const Description = () => {
  const isPortrait = useRecoilValue_TRANSITION_SUPPORT_UNSTABLE(isPortraitAtom);
  return (
    <DescriptionWrapper>
      <UserCount />
      <TimerPerSet />
      <RoundPerGame />
      {isPortrait || <Detail />}
    </DescriptionWrapper>
  );
};

const Detail = () => (
  <DetailWrapper>
    <DetailParagraph>방을 새로 만들거나 입장한 후, 게임을 진행해주세요!</DetailParagraph>
    <DetailParagraph>방에 2명 이상의 인원이 있어야 게임을 시작할 수 있습니다.</DetailParagraph>
    <DetailParagraph>게임이 시작되면 출제자는 제시어에 대한 그림을 그려주세요.</DetailParagraph>
    <DetailParagraph>나머지 인원은 그림을 보고 예상되는 정답을 입력해주세요.</DetailParagraph>
    <DetailParagraph>
      정답을 맞출 경우 출제자는 {DRAWING_SCORE}점, 정답자는 {ANSWER_SCORE}점을 얻습니다.
    </DetailParagraph>
    <DetailParagraph>한 라운드는 게임 참여 인원 만큼의 세트로 진행됩니다.</DetailParagraph>
    <DetailParagraph>진행 도중 입장한 인원은 다음 라운드 시작까지 관전합니다.</DetailParagraph>
    <DetailParagraph>매 라운드 시작마다 모든 관전자들은 새로 게임에 참여합니다.</DetailParagraph>
    <DetailParagraph>{MAX_GAME_ROUND}라운드 진행 후, 가장 많은 점수를 얻은 사람이 승리합니다.</DetailParagraph>
  </DetailWrapper>
);

export default Description;
