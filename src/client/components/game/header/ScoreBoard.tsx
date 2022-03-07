import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isScoreBoardOnSelector } from 'client/atom/modalAtom';
import { gameAtom, scoreSelector } from 'client/atom/gameAtom';
import User from 'client/components/common/User';
import { MAX_GAME_ROUND } from 'shared/constant';

const ScoreBoardWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;

  padding: 10px;
  width: 200px;
  max-height: 300px;
  top: 90px;
  right: 10px;
  transform: ${({ isActivated }) => `translateX(${isActivated ? '0px' : '210px'})`};

  border: 3px solid #cdb699;
  border-radius: 10px;

  background-color: #fbf8f134;
  backdrop-filter: blur(4px);

  overflow-y: scroll;

  display: flex;
  flex-direction: column;

  z-index: 1;

  transition: transform 0.4s;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const Progress = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Round = styled.div``;
const Set = styled.div``;
const Line = styled.div`
  margin: 15px 0px;
  background-color: #444;
  height: 2px;
`;
const Score = styled.div`
  position: relative;
  height: 18px;
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 10px;
  }
`;

const ScoreBoard = () => {
  const game = useRecoilValue(gameAtom);
  const score = useRecoilValue(scoreSelector);
  const isOn = useRecoilValue(isScoreBoardOnSelector);

  if (!game) return <></>;

  const { round, set, users } = game;

  return (
    <ScoreBoardWrapper isActivated={isOn}>
      <Progress>
        <Round>{`ROUND ${round} / ${MAX_GAME_ROUND}`}</Round>
        <Set>{`SET ${set} / ${users.length}`}</Set>
      </Progress>
      <Line />
      {score.map(({ user, value }) => (
        <Score>
          <User key={user.id} {...user} />
          {`${value}점`}
        </Score>
      ))}
    </ScoreBoardWrapper>
  );
};

export default ScoreBoard;
