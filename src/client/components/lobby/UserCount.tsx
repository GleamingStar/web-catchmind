import styled from 'styled-components';
import { useRecoilValue } from 'recoil';
import { BsPeople } from 'react-icons/bs';
import { userCountAtom } from 'client/atom/miscAtom';

const UserCountWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;

  color: #596e79;

  display: flex;
`;
const Title = styled.div``;
const Count = styled.div`
  margin-left: 10px;
  font-size: 18px;
`;

const UserCount = () => {
  const count = useRecoilValue(userCountAtom);
  return (
    <UserCountWrapper>
      <Title title="현재 접속 인원">
        <BsPeople size={20} />
      </Title>
      <Count>{count}</Count>
    </UserCountWrapper>
  );
};

export default UserCount;
