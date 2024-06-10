'use client';

import styled from 'styled-components';
import theme from '../../../styles/theme';
import MultiNavBar from './NavBar';
import { NAV_DATA } from './navProps';
import { usePathname, useRouter } from 'next/navigation';
import LocalStorage from '@/utils/localStorage';
import Button from '../Button';

const Header = () => {
  const router = useRouter();
  const pathname = usePathname();
  const token = LocalStorage.getItem('@token') as string;
  const name = pathname.slice(1, -2);

  const Logo = () => {
    return (
      <div id="header__logo" onClick={() => router.push('/')}>
        KREAM
      </div>
    );
  };

  return (
    <HeaderWrapper>
      <HeaderTop>
        <MultiNavBar type="top" data={NAV_DATA.TOP_NAV_DATA(token)} />
      </HeaderTop>

      {pathname.startsWith('/sell') || pathname.startsWith('/buy') ? (
        <HeaderInner
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Logo />
          <h1 style={{ fontSize: '2.4rem', fontWeight: 600 }}>
            {name === 'buy' ? '주문/결제' : '주문/정산'}
          </h1>
          <div style={{ width: '8.125rem', height: '3.7rem' }} />
        </HeaderInner>
      ) : (
        <HeaderInner>
          <Logo />
          <MultiNavBar type="main" data={NAV_DATA.MAIN_NAV_DATA} />
          <SearchContainer>
            <InputStyled type="text" placeholder="Search in site"></InputStyled>
            <ImageStyled
              src="/search.png"
              alt="돋보기 이미지"
              onClick={() => null}
            />
          </SearchContainer>
        </HeaderInner>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  height: 13rem;
  display: flex;
  flex-direction: column;
  border-bottom: 0.1rem solid ${theme.colors.border};
  margin: auto;
  padding-bottom: 1rem;
`;

const HeaderTop = styled.div`
  position: relative;
  height: 10rem;
  margin-top: 1rem;
`;

const HeaderInner = styled.div`
  display: flex;
  padding: 2rem 5rem 0;
  #header__logo {
    font-size: ${theme.fontSize.headline1};
    font-weight: bold;
    cursor: pointer;
  }
  position: relative;
`;

const InputStyled = styled.input`
  height: 3.8rem;
  width: 25rem;
  border-radius: 0.6rem;
  padding: 0.5rem;
`;

const ImageStyled = styled.img`
  width: 3rem;
  height: 3rem;
  margin-left: 1rem;
  cursor: pointer;
`;
const SearchContainer = styled.div`
  width: 30rem;
  height: 4rem;
  border: 0.1rem solid ${theme.colors.gray[200]};
  border-radius: 0.6rem;
  position: absolute;
  right: 1rem;
`;

export default Header;
