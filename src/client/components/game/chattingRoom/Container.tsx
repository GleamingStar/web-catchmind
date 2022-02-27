import styled from 'styled-components';
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

const Container = () => {
  const chatLog = useRecoilValue(chatLogAtom);

  return (
    <ContainerWrapper>
      {chatLog.map((chat) => (
        <Chat key={chat.id} {...chat} />
      ))}
    </ContainerWrapper>
  );
};
export default Container;
