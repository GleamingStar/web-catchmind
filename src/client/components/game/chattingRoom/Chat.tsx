import styled from 'styled-components';
import User from 'client/components/common/User';
import { MessageType, TChat } from 'shared/types';

const ChatWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  & + & {
    margin-top: 5px;
  }
  user-select: text;
`;
const Colon = styled.div`
  color: #000;
  margin-right: 4px;
`;
const Message = styled.div<{ type: MessageType }>`
  color: ${({ type }) => (type === MessageType.User ? '#000' : '#888')};
`;

const Chat = ({ type, name, imgUrl, message }: TChat) => {
  return (
    <ChatWrapper>
      {type === MessageType.User && (
        <>
          <User name={name} imgUrl={imgUrl} />
          <Colon>:</Colon>
        </>
      )}
      <Message type={type}>{message}</Message>
    </ChatWrapper>
  );
};

export default Chat;
