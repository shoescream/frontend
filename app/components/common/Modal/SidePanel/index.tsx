import styled, { keyframes } from 'styled-components';
import theme from '../../../../styles/theme';

interface SidePanelProps {
  onClick: () => void;
}

const SidePanel = ({ onClick }: SidePanelProps) => {
  return (
    <SidePanelWrapper>
      <SidePanelHeader>
        <h1 id="close__btn" onClick={onClick}>
          X
        </h1>
        <h1>알림</h1>
      </SidePanelHeader>
      <SidepanelConent onClick={() => null}>
        <Content>
          <AlarmIconWrapper>
            <AlarmIcon src="bookmarkInner.png"></AlarmIcon>
          </AlarmIconWrapper>
          <ItemInfo>
            <h3>title</h3>
            <p>description</p>
            <p id="alarm__time">time</p>
          </ItemInfo>
          <ItemImgBox>
            <ItemImg></ItemImg>
          </ItemImgBox>
        </Content>
      </SidepanelConent>
    </SidePanelWrapper>
  );
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

const SidePanelHeader = styled.div`
  width: 100%;
  display: flex;
  padding: 5rem 3rem;
  * {
    margin-right: 3rem;
    font-size: ${theme.fontSize.title1};
  }
  #close__btn {
    cursor: pointer;
  }
`;

const SidepanelConent = styled.div`
  padding: 1rem 1rem;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  border-bottom: solid 0.1rem ${theme.colors.gray[200]};
  padding-bottom: 1rem;
`;

const AlarmIconWrapper = styled.div`
  width: 4rem;
  height: 4rem;
  background-color: #ccc;
  border-radius: 50%;
  position: relative;
`;

const AlarmIcon = styled.img`
  width: 35%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ItemInfo = styled.div`
  width: 70%;
  padding: 0 1rem;
  #alarm__time {
    color: ${theme.colors.gray[300]};
  }
`;

const ItemImgBox = styled.div`
  width: 20%;
`;

const ItemImg = styled.img`
  width: 6rem;
  height: 6rem;
  background-color: #ccc;
  margin-left: 1.5rem;
`;
