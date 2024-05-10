import styled from 'styled-components';
import theme from '../../../styles/theme';
import MultiNavBar from './NavBar';
import { NAV_DATA } from './navProps';
import { useRouter } from 'next/navigation';
import LocalStorage from '@/utils/localStorage';

const Header = () => {
  const router = useRouter();
  const token = LocalStorage.getItem('@token');

  return (
    <HeaderWrapper>
      <HeaderTop>
        <MultiNavBar type="top" data={NAV_DATA.TOP_NAV_DATA(token!)} />
      </HeaderTop>
      <HeaderInner>
        <div id="header__logo" onClick={() => router.push('/')}>
          KREAM
        </div>
        <MultiNavBar type="main" data={NAV_DATA.MAIN_NAV_DATA} />
        <SearchContainer>
          <InputStyled type="text" placeholder="Search in site"></InputStyled>
          <ImageStyled
            src="/search.png"
            alt="돋보기 이미지"
            onClick={() => null}
          ></ImageStyled>
        </SearchContainer>
      </HeaderInner>
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
