import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
import { chatLogAtom } from 'client/atom/chatAtom';
import { currentRoomIndexAtom, roomListAtom } from 'client/atom/roomAtom';
import { TChat } from 'shared/types';
import socket from './socket';

const Listener = () => {
  const setChatLog = useSetRecoilState(chatLogAtom);
  const setRoomIndex = useSetRecoilState(currentRoomIndexAtom);
  const setRoomList = useSetRecoilState(roomListAtom);
  const setAccount = useSetRecoilState(accountAtom);

  useEffect(() => {
    socket.on('chat', (chat: TChat) => setChatLog((log) => [...log, chat]));
    socket.on('room/update', setRoomList);
    socket.on('room/join', setRoomIndex);
    socket.on('login/success', setAccount);

    return () => {
      socket.offAny();
    };
  }, []);

  return <></>;
};

export default Listener;
