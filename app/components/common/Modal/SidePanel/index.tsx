import styled, { keyframes } from 'styled-components';
import theme from '../../../../styles/theme';
import { TfiClose } from 'react-icons/tfi';
import { useNotification } from '@/hooks/queries/useNotification';
import { IoNotifications } from 'react-icons/io5';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface SidePanelProps {
  onClick: () => void;
}

const SidePanel = ({ onClick }: SidePanelProps) => {
  const router = useRouter();
  const { data } = useNotification();
  const [isClosed, setIsClosed] = useState(false);

  const handleClose = () => {
    setIsClosed(true);
    setTimeout(onClick, 500);
  };

  const handleDate = (date: string) => {
    if (date) {
      const value = date.split('T')[0].split('-');
      return `${value[0]}년 ${Number(value[1])}월 ${Number(value[2])}일`;
    }
    return '2024년 6월 17일';
  };

  const showText = (type: string) => {
    if (type === 'PAYMENT') {
      return '상품을 결제 완료하였습니다.';
    } else if (type === 'COMPLETE_BUY') {
      return '상품을 구매 완료하였습니다..';
    } else if (type === 'COMPLETE_SELL') {
      return '상품을 판매 완료하였습니다.';
    }
  };

  return (
    <SidePanelWrapper $isClosed={isClosed}>
      <SidePanelHeader>
        <h1 id="close__btn" onClick={handleClose}>
          <TfiClose />
        </h1>
        <h1 style={{ marginBottom: '0.4rem' }}>알림</h1>
      </SidePanelHeader>
      <SidepanelConent
        onClick={() => {
          router.push('my/history/buying');
          handleClose();
        }}
      >
        <h3 style={{ fontSize: '1.6rem', margin: '2.4rem 0 1.6rem' }}>
          지난 알림
        </h3>
        {data?.result?.map((item) => (
          <div key={item.notificationNumber}>
            <Content>
              <AlarmIconWrapper>
                <IoNotifications size={23} />
              </AlarmIconWrapper>
              <ItemInfo>
                <h3 style={{ fontSize: '1.5rem' }}>
                  {item.notificationContent}
                </h3>
                <p
                  style={{
                    fontSize: '1.3rem',
                    margin: '0.5rem 0',
                    whiteSpace: 'pre-line',
                    wordBreak: 'break-all',
                    fontWeight: 400,
                    color: theme.colors.text.primary,
                  }}
                >
                  {item.object.productName} {showText(item.notificationType)}
                </p>
                <time style={{ fontSize: '1.3rem' }} id="alarm__time">
                  {handleDate(item.createdAt)}
                </time>
              </ItemInfo>
              <ItemImg></ItemImg>
            </Content>
            <Divider />
          </div>
        ))}
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

const slideOutRight = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const SidePanelWrapper = styled.div<{ $isClosed: boolean }>`
  width: 42rem;
  height: 100%;
  background-color: #ffffff;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  animation: ${(props) => (props.$isClosed ? slideOutRight : slideInLeft)} 0.5s
    ease;
  padding: 0 2.4rem;
`;

const SidePanelHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 3rem 0;
  * {
    font-size: ${theme.fontSize.title1};
  }
  #close__btn {
    cursor: pointer;
  }
`;

const SidepanelConent = styled.div``;

const Content = styled.div`
  width: 100%;
  display: flex;
  margin-top: 2rem;
  cursor: pointer;
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #f0f0f0;
  margin: 2.4rem 0;
`;

const AlarmIconWrapper = styled.div`
  width: 4.6rem;
  height: 4.6rem;
  background-color: #f4f4f4;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// const AlarmIcon = styled.img`
//   width: 1.6rem;
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
// `;

const ItemInfo = styled.div`
  flex: 1;
  padding: 0 1rem;
  #alarm__time {
    color: ${theme.colors.text.secondary};
  }
`;

const ItemImg = styled.img`
  width: 6.2rem;
  height: 6.2rem;
  background-color: #f0f0f0;
  border-radius: 10px;
  outline: 'none';
`;
