import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
    filter: hue-rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    filter: hue-rotate(360deg);
  }
  `;

const unfilter = keyframes`
  from {
    filter: hue-rotate(0deg);
  }
  to {
    filter: hue-rotate(-360deg);
  }
`;

const SpinnerWrapper = styled.div<{ size: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  background: linear-gradient(45deg, transparent, transparent 40%, #ffc);
  animation: 1s linear infinite ${spin};
`;
const InnerCircle = styled.div<{ size: number; color: string }>`
  position: absolute;
  left: ${({ size }) => size / 10}px;
  right: ${({ size }) => size / 10}px;
  top: ${({ size }) => size / 10}px;
  bottom: ${({ size }) => size / 10}px;
  background-color: ${({ color }) => color};
  animation: 1s linear infinite ${unfilter};
  border-radius: 50%;
`;

const Spinner = ({ backgroundColor, size }: { backgroundColor?: string; size: number }) => (
  <SpinnerWrapper size={size}>
    <InnerCircle color={backgroundColor || '#dfd3c3'} size={size} />
  </SpinnerWrapper>
);

export default Spinner;
