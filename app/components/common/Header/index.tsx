import styled from 'styled-components';
import theme from '../../../styles/theme';
import MultiNavBar from './NavBar';
import { NAV_DATA } from './navProps';
const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderTop>
        <MultiNavBar type="top" data={NAV_DATA.TOP_NAV_DATA} />
      </HeaderTop>
      <HeaderInner>
        <div id="header__logo">KREAM</div>
        <MultiNavBar type="main" data={NAV_DATA.MAIN_NAV_DATA} />
        <SearchContainer>
          <InputStyled type="text" placeholder="Search in site"></InputStyled>
          <ImageStyled src="/search.png" alt="돋보기 이미지"></ImageStyled>
        </SearchContainer>
      </HeaderInner>
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.header`
  width: 1440px;
  height: 180px;
  display: flex;
  flex-direction: column;
`;
const HeaderTop = styled.div`
  position: relative;
  height: 100px;
`;
const HeaderInner = styled.div`
  display: flex;
  padding: 0 50px 0 50px;
  #header__logo {
    font-size: ${theme.fontSize.headline1};
    font-weight: 1000;
  }
  position: relative;
`;
const InputStyled = styled.input`
  height: 38px;
  width: 250px;
  border-radius: 6px;
  padding: 5px;
`;
const ImageStyled = styled.img`
  width: 30px;
  height: 30px;
  margin-left: 10px;
`;
const SearchContainer = styled.div`
  width: 300px;
  height: 40px;
  border: 1px solid ${theme.colors.gray[200]};
  border-radius: 6px;
  position: absolute;
  right: 10px;
`;
export default Header;
