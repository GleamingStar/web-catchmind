import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { BsAwardFill } from 'react-icons/bs';
import { isEndAtom, resultAtom } from 'client/atom/gameAtom';
import User from 'client/components/common/User';

const ResultWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;
  top: 50px;
  left: 50px;
  width: 400px;
  height: 400px;

  border: 5px solid #cdb699;
  border-radius: 10px;
  background-color: #ddd8;
  box-shadow: 10px 10px 10px #aaa;
  backdrop-filter: blur(5px);

  transform: ${({ isActivated }) => `translateY(${isActivated ? 0 : '-460px'})`};

  transition: transform 0.5s ease-out;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  pointer-events: none;
`;
const Title = styled.div``;
const Line = styled.div`
  width: 350px;
  height: 2px;
  background-color: #cdb699;
`;
const ScoreWrapper = styled.div`
  height: 250px;
  width: 250px;
  display: flex;
  flex-direction: column;
`;
const Score = styled.div`
  display: flex;
  justify-content: space-between;
  & + & {
    margin-top: 10px;
  }
`;
const Value = styled.div`
  width: 55px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  justify-content: space-between;
`;

const Result = () => {
  const result = useRecoilValue(resultAtom);
  const isEnd = useRecoilValue(isEndAtom);

  const MINIMUM_WIN_SCORE = 1;
  const maxScore = result.reduce((acc, { value }) => (value > acc ? value : acc), MINIMUM_WIN_SCORE);

  return (
    <ResultWrapper isActivated={isEnd}>
      <Title>게임이 종료되었습니다.</Title>
      <Line />
      <ScoreWrapper>
        {[...result]
          .sort((a, b) => b.value - a.value)
          .map(({ user, value }) => (
            <Score key={user.id}>
              <User {...user} />
              <Value>
                {value}점{value === maxScore && <BsAwardFill color="#EEC373" />}
              </Value>
            </Score>
          ))}
      </ScoreWrapper>
    </ResultWrapper>
  );
};

export default Result;
