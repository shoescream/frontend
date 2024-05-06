import styled, { keyframes } from 'styled-components';

const SidePanel = () => {
  return <SidePanelWrapper></SidePanelWrapper>;
};
export default SidePanel;

const slideInLeft = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const SidePanelWrapper = styled.div`
  width: 42rem;
  height: 100%;
  background-color: #ffffff;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  border-top-left-radius: 0.75rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${slideInLeft} 0.5s ease;
`;
