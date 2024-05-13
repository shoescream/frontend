import styled from 'styled-components';

interface ToastProps {
  success: boolean;
  message: string;
  isToast: boolean;
}

const CustomToast = ({ success, message, isToast }: ToastProps) => {
  return (
    <ToastBox isToast={isToast ? 'true' : 'false'}>
      <img src={success ? '' : ''} />
      {message}
    </ToastBox>
  );
};
export default CustomToast;

const ToastBox = styled.div<{ isToast: string }>`
  opacity: ${(props) => (props.isToast === 'false' ? '0%' : '100%')};
  position: fixed;
  top: ${(props) => (props.isToast === 'false' ? '-10rem' : '5rem')};
  left: 50%;
  transform: translate(-50%, 0);
  padding: 1rem 5rem;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 10rem;
  color: #fff;
  transition: all 1s;
  z-index: 999;
`;
