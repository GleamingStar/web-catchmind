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
  @media screen and (max-width: 800px) {
    height: calc(100% - 560px);
    min-height: 140px;
  }
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
    const scroll: EventListener = () => {
      if (window.innerHeight > 700) return;
      containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'auto' });
    };

    window.addEventListener('resize', scroll);
    
    return () => {
      window.removeEventListener('resize', scroll);
    };
  }, []);

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
