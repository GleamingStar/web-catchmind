import styled from 'styled-components';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-arrow-repeat"
        viewBox="0 0 16 16"
      >
        <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z" />
        <path
          fillRule="evenodd"
          d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"
        />
      </svg>
    </RefreshButtonWrapper>
  );
};

export default Preview;
