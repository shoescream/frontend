'use client';
import theme from '@/styles/theme';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../Modal';
import LocalStorage from '@/utils/localStorage';

interface NavDataProps {
  title?: string;
  path: string;
}
interface NavProps {
  type?: 'top' | 'main';
  data?: NavDataProps[];
}
const MultiNavBar = ({ type = 'top', data }: NavProps) => {
  const router = useRouter();
  const path = usePathname();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(LocalStorage.getItem('@token'));
  }, []);

  const logout = () => {
    LocalStorage.removeItem('@token');
    window.location.href = '/';
  };

  return (
    <NavWrapper type={type}>
      {data &&
        data.map((navData, idx) => (
          <ButtonWrapper
            onClick={() => router.push(navData.path)}
            key={idx}
            type={type}
            active={path === navData.path ? 'true' : 'false'}
          >
            {navData.title}
          </ButtonWrapper>
        ))}
      {type === 'top' ? ( // 알람과 modal창을 띄워야해서 따로 분리 했습니다.
        <>
          <ButtonWrapper
            type={type}
            onClick={() => setIsOpenModal(!isOpenModal)}
          >
            알림
          </ButtonWrapper>
          <ButtonWrapper
            type={type}
            onClick={() => (token ? logout() : router.push('/login'))}
          >
            {token ? '로그아웃' : '로그인'}
          </ButtonWrapper>
        </>
      ) : (
        ''
      )}
      {isOpenModal && (
        <Modal
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          type="sidePanel"
        ></Modal>
      )}
    </NavWrapper>
  );
};
const NavWrapper = styled.nav<{ type: string }>`
  height: ${(props) => (props.type === 'top' ? '1.5rem' : '4.2rem')};
  font-size: ${(props) =>
    props.type === 'top' ? theme.fontSize.caption2 : theme.fontSize.title2};
  position: ${(props) => (props.type === 'top' ? 'absolute' : 'static')};
  top: 0;
  right: 0;
`;
const ButtonWrapper = styled.button<{ type: string; active?: string }>`
  width: ${(props) => (props.type === 'top' ? '7rem' : '10rem')};
  margin: 0 1rem 0 0.5rem;
  background-color: #ffffff;
  line-height: ${(props) => (props.type === 'top' ? '' : '4.2rem')};
  font-family: ${theme.fonts.pretendard}, sans-serif;
  font-weight: ${(props) => (props.active === 'true' ? 'bold' : 'normal')};
  text-decoration: ${(props) =>
    props.active === 'true' ? 'underline' : 'none'};
`;

export default MultiNavBar;
