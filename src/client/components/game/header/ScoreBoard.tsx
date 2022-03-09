import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { BsBrushFill } from 'react-icons/bs';
import { isScoreBoardOnSelector } from 'client/atom/modalAtom';
import { gameAtom, scoreSelector } from 'client/atom/gameAtom';
import User from 'client/components/common/User';

const ScoreBoardWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;

  padding: 10px;
  width: 250px;
  max-height: 300px;
  top: 90px;
  right: 10px;
  transform: ${({ isActivated }) => `translateX(${isActivated ? '0px' : '260px'})`};

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
const Score = styled.div<{ isParticipated: boolean }>`
  position: relative;
  height: 18px;
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 10px;
  }
  filter: ${({ isParticipated }) => `contrast(${isParticipated ? 100 : 10}%)`};
`;
const Painter = styled.div`
  position: absolute;
  left: -1px;
  color: #cdb699;
  filter: drop-shadow(1px 1px 1px #000);
`;

const ScoreBoard = () => {
  const game = useRecoilValue(gameAtom);
  const score = useRecoilValue(scoreSelector);
  const isOn = useRecoilValue(isScoreBoardOnSelector);

  if (!game) return <></>;

  const { round, set } = game;

  return (
    <ScoreBoardWrapper isActivated={isOn}>
      <Progress>
        <Round>{`ROUND ${round}`}</Round>
        <Set>{`SET ${set}`}</Set>
      </Progress>
      <Line />
      {score.map(({ user, value }) => (
        <Score isParticipated={Boolean(game.users.find(({ id }) => id === user.id))}>
          <User key={user.id} {...user} />
          {`${value}점`}
          {game.painter.id === user.id && (
            <Painter>
              <BsBrushFill />
            </Painter>
          )}
        </Score>
      ))}
    </ScoreBoardWrapper>
  );
};

export default ScoreBoard;
