import styled from 'styled-components';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isPortraitAtom } from 'client/atom/miscAtom';
import { LANDSCAPE_WIDTH } from 'shared/constant';
import RoomList from './roomlist/RoomList';
import Description from './description/Description';

const LobbyWrapper = styled.div`
  position: relative;
  height: 100%;
`;

const Lobby = () => {
  const setPortrait = useSetRecoilState(isPortraitAtom);

  useEffect(() => {
    setPortrait(window.innerWidth < LANDSCAPE_WIDTH);
  }, []);

  return (
    <LobbyWrapper>
      <Description />
      <RoomList />
    </LobbyWrapper>
  );
};

export default Lobby;
