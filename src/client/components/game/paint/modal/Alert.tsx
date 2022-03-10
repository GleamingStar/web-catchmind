import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { gameAtom } from 'client/atom/gameAtom';

const AlertWrapper = styled.div<{ isActivated: boolean }>`
  position: absolute;
  padding: 5px;
  top: 50px;
  left: 50%;

  border: 2px solid #cdb699;
  border-radius: 10px;
  background-color: #fbf8f134;
  backdrop-filter: blur(4px);

  transform: ${({ isActivated }) => `translate(-50%, ${isActivated ? '0px' : '-90px'})`};
  transition: transform 0.4s;

  white-space: nowrap;
  pointer-events: none;
`;

const Alert = () => {
  const game = useRecoilValue(gameAtom);
  const account = useRecoilValue(accountAtom);
  const [isActivated, setActivated] = useState(false);

  useEffect(() => {
    if (game?.painter.id !== account?.id || game.status === 'WAITING') return;
    setActivated(true);
    setTimeout(() => setActivated(false), 5000);
  }, [game, account]);

  return <AlertWrapper isActivated={isActivated}>출제자가 되셨습니다. 제시어를 그림으로 설명해주세요!</AlertWrapper>;
};

export default Alert;
