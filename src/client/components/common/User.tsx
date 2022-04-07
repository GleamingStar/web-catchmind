import styled, { keyframes } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accountAtom } from 'client/atom/accountAtom';
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
const SkeletonMove = keyframes`
  from {
    background-position: unset;
  }
  to {
    background-position: ${PROFILE_IMAGE_SIZE * 2}px;
  }
  `;
const SkeletonImg = styled.div`
  position: absolute;
  width: ${PROFILE_IMAGE_SIZE}px;
  height: ${PROFILE_IMAGE_SIZE}px;
  border-radius: 50%;
  background-image: linear-gradient(to right, #c9c9c9 8%, #7d7d7d 18%, #c9c9c9 33%);

  animation: 0.8s linear 0s infinite ${SkeletonMove};
`;
const UserName = styled.div<{ amI: boolean }>`
  margin-right: 4px;
  color: ${({ amI }) => (amI ? '#5B7DB1' : '#000')};
`;

const User = ({ name, imgUrl }: { name: string; imgUrl: string }) => {
  const account = useRecoilValue(accountAtom);
  const [isLoading, setLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoading(imgRef.current.complete);
  }, [imgUrl]);

  return (
    <UserWrapper>
      <UserImg src={imgUrl} onLoad={() => setLoading(true)} ref={imgRef} alt="user profile image" />
      {!isLoading && <SkeletonImg />}
      <UserName amI={account?.name === name}>{name}</UserName>
    </UserWrapper>
  );
};

export default User;
