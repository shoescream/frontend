'use client';
import theme from '@/styles/theme';
import { usePathname, useRouter } from 'next/navigation';
import styled from 'styled-components';

interface NavDataProps {
  title?: string;
  path?: string;
}
interface NavProps {
  type?: 'top' | 'main';
  data?: NavDataProps[];
}
const MultiNavBar = ({ type = 'top', data }: NavProps) => {
  const router = useRouter();
  const path = usePathname();
  return (
    <NavWrapper type={type}>
      {data &&
        data.map((navData, idx) => (
          <ButtonWrapper
            onClick={() => router.push('/' + navData.path)}
            key={idx}
            type={type}
            active={path === '/' + navData.path ? 'true' : 'false'}
          >
            {navData.title}
          </ButtonWrapper>
        ))}
      {type === 'top' ? ( // 알람과 modal창을 띄워야해서 따로 분리 했습니다.
        <>
          <ButtonWrapper
            type={type}
            onClick={() => console.log('알람 이벤트 처리')}
          >
            알림
          </ButtonWrapper>
          <ButtonWrapper type={type} onClick={() => router.push('/login')}>
            로그인
          </ButtonWrapper>
        </>
      ) : (
        ''
      )}
    </NavWrapper>
  );
};
const NavWrapper = styled.nav<{ type: string }>`
  height: ${(props) => (props.type === 'top' ? '15px' : '42.5px')};
  font-size: ${(props) =>
    props.type === 'top' ? theme.fontSize.caption3 : theme.fontSize.title2};
  position: ${(props) => (props.type === 'top' ? 'absolute' : 'static')};
  top: 0;
  right: 0;
`;
const ButtonWrapper = styled.button<{ type: string; active?: string }>`
  width: ${(props) => (props.type === 'top' ? '70px' : '100px')};
  margin: 0 10px 0 5px;
  background-color: #ffffff;
  line-height: ${(props) => (props.type === 'top' ? '' : '42.5px')};
  font-weight: ${(props) => (props.active === 'true' ? 'bold' : 'normal')};
  text-decoration: ${(props) =>
    props.active === 'true' ? 'underline' : 'none'};
`;

export default MultiNavBar;
