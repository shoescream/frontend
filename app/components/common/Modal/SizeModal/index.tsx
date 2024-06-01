import styled from 'styled-components';
import { MouseEvent, PropsWithChildren } from 'react';

interface SizeModalProps {
  onClose: () => void;
  height?: string;
}

const SizeModal = ({
  children,
  onClose,
  height,
}: PropsWithChildren<SizeModalProps>) => {
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Blur onClick={onClose}>
      <Content onClick={handleContentClick} $height={height}>
        {children}
      </Content>
    </Blur>
  );
};
export default SizeModal;

const Blur = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  /* right: 0; */
  left: 0;
  /* bottom: 0; */
  background-color: #22222290;
  position: fixed;
  z-index: 4;
`;

const Content = styled.div<{ $height?: string }>`
  width: 48rem;
  height: ${(props) => props.$height || '51.4rem'};
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  z-index: 2;
  background-color: white;
  overflow: scroll;
`;
