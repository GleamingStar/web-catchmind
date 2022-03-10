import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { answerSelector, gameAtom, isPainterSelector } from 'client/atom/gameAtom';

const AnswerWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;
  padding: 5px;
  top: 10px;
  right: 10px;
  pointer-events: none;

  border: 2px solid #cdb699;
  border-radius: 10px;
  background-color: #fbf8f134;
  backdrop-filter: blur(4px);

  transform: ${({ isActivated }) => `translateX(${isActivated ? '0px' : '90px'})`};
  transition: transform 0.4s;
`;

const Answer = () => {
  const game = useRecoilValue(gameAtom);
  const answer = useRecoilValue(answerSelector);
  const account = useRecoilValue(accountAtom);
  const isPainter = useRecoilValue(isPainterSelector);
  const isPlaying = game?.users.some(({ id }) => id === account.id) && game.status === 'PLAYING';

  return (
    <AnswerWrapper isActivated={game !== null}>
      {isPainter || !isPlaying ? answer : answer.replace(/./g, '●')}
    </AnswerWrapper>
  );
};

export default Answer;
