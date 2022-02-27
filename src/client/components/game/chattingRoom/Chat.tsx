import styled from 'styled-components';
import { MessageType, TChat } from 'shared/types';
import { PROFILE_IMAGE_SIZE } from 'shared/constant';

const ChatWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  & + & {
    margin-top: 5px;
  }
`;
const Colon = styled.div`
  color: #000;
  margin-right: 4px;
`;
const Message = styled.div<{ type: MessageType }>`
  color: ${({ type }) => (type === MessageType.User ? '#000' : '#888')};
`;
const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  & + & {
    margin-top: 5px;
  }
`;
const UserImg = styled.img`
  width: ${PROFILE_IMAGE_SIZE}px;
  height: ${PROFILE_IMAGE_SIZE}px;
  border-radius: 50%;
  margin-right: 4px;
`;
const UserName = styled.div`
  margin-right: 4px;
  color: #000;
`;

const Chat = ({ type, name, imgUrl, message }: TChat) => {
  return (
    <ChatWrapper>
      {' '}
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

const User = ({ name, imgUrl }: { name: string; imgUrl: string }) => (
  <UserWrapper>
    <UserImg src={imgUrl} />
    <UserName>{name}</UserName>
  </UserWrapper>
);

export default Chat;
