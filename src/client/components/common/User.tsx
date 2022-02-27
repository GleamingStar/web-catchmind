import styled from 'styled-components';
import { PROFILE_IMAGE_SIZE } from 'shared/constant';

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

const User = ({ name, imgUrl }: { name: string; imgUrl: string }) => (
  <UserWrapper>
    <UserImg src={imgUrl} />
    <UserName>{name}</UserName>
  </UserWrapper>
);

export default User;
