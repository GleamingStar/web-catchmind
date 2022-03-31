import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsArrowRepeat } from 'react-icons/bs';
import { imageUrlAtom, userImageSelector, userNameAtom } from 'client/atom/accountAtom';
import { makeHash } from 'client/config/util';
import User from 'client/components/common/User';

const PreviewWrapper = styled.div`
  position: absolute;
  top: 48%;
  padding: 5px;
  background-color: #f7ecde;
  border-radius: 12px;

  display: flex;
  align-items: center;
`;
const RefreshButtonWrapper = styled.div`
  margin-right: 10px;
  margin-left: 5px;

  color: #493323;

  @media (hover: hover) {
    &:hover {
      filter: brightness(250%);
    }
  }

  transition: filter 0.3s;

  cursor: pointer;
`;

const Preview = () => {
  const userName = useRecoilValue(userNameAtom);
  const userImage = useRecoilValue(userImageSelector);
  return (
    <PreviewWrapper>
      <RefreshButton />
      <User imgUrl={userImage} name={userName || '미리보기'} />
    </PreviewWrapper>
  );
};

const RefreshButton = () => {
  const refresh = useSetRecoilState(imageUrlAtom);
  return (
    <RefreshButtonWrapper onClick={() => refresh(makeHash(32))} title="프로필 이미지 새로고침">
      <BsArrowRepeat />
    </RefreshButtonWrapper>
  );
};

export default Preview;
