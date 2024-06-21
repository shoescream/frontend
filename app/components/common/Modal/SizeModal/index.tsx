import styled, { CSSProperties } from 'styled-components';
import { MouseEvent, PropsWithChildren } from 'react';
import theme from '@/styles/theme';

interface SizeModalProps {
  onClose: () => void;
  height?: string;
  style?: CSSProperties;
  title?: string;
}

const SizeModal = ({
  children,
  onClose,
  height,
  title,
  style,
}: PropsWithChildren<SizeModalProps>) => {
  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <Blur onClick={onClose}>
      <div>
        <Content onClick={handleContentClick} $height={height} style={style}>
          {title && (
            <ModalHeader>
              <h1 style={{ fontSize: '2rem' }}>{title}</h1>
            </ModalHeader>
          )}
          {children}
        </Content>
      </div>
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
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none !important;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: ${theme.fontSize.title2};
  height: 5.8rem;
`;
