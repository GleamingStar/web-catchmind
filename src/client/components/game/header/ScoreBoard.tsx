import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { isScoreBoardOnSelector } from 'client/atom/headerAtom';
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

  @media screen and (max-width: 800px) {
    top: 80px;
    left: 0;
    width: 200px;
    transform: ${({ isActivated }) => `translateX(${isActivated ? '0px' : '-200px'})`};
    height: calc(100vh - 580px);
    min-height: 120px;
    max-height: none;
  }

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
        <Score key={user.id} isParticipated={Boolean(game.users.find(({ id }) => id === user.id))}>
          <User {...user} />
          {`${value}점`}
          {game.painter.id === user.id && (
            <Painter>
              <Brush />
            </Painter>
          )}
        </Score>
      ))}
    </ScoreBoardWrapper>
  );
};

const Brush = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    fill="currentColor"
    className="bi bi-brush-fill"
    viewBox="0 0 16 16"
  >
    <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04z" />
  </svg>
);

export default ScoreBoard;
