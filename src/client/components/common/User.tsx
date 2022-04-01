import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
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
const SkeletonImg = styled.div`
  position: absolute;
  width: ${PROFILE_IMAGE_SIZE}px;
  height: ${PROFILE_IMAGE_SIZE}px;
  border-radius: 50%;
  background-color: #dcd8d2;
`;
const UserName = styled.div`
  margin-right: 4px;
  color: #000;
`;

const User = ({ name, imgUrl }: { name: string; imgUrl: string }) => {
  const [isLoading, setLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setLoading(imgRef.current.complete);
  }, [imgUrl]);

  return (
    <UserWrapper>
      <UserImg src={imgUrl} onLoad={() => setLoading(true)} ref={imgRef} alt="user profile image" />
      {!isLoading && <SkeletonImg />}
      <UserName>{name}</UserName>
    </UserWrapper>
  );
};

export default User;
