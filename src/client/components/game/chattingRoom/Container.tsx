import styled from 'styled-components';
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { chatLogAtom } from 'client/atom/chatAtom';
import Chat from './Chat';

const ContainerWrapper = styled.div`
  position: relative;
  padding: 10px;
  width: 300px;
  height: 460px;
  background-color: #fbf8f1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const AUTO_SCROLL_HEIGHT = 225;

const Container = () => {
  const chatLog = useRecoilValue(chatLogAtom);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

    if (scrollHeight - scrollTop - AUTO_SCROLL_HEIGHT <= clientHeight)
      containerRef.current.scrollTo({ top: scrollHeight, behavior: 'smooth' });
  }, [chatLog]);

  return (
    <ContainerWrapper ref={containerRef}>
      {chatLog.map((chat) => (
        <Chat key={chat.id} {...chat} />
      ))}
    </ContainerWrapper>
  );
};
export default Container;
