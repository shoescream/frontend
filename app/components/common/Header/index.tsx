'use client';
import styled from 'styled-components';
import theme from '../../../styles/theme';
const Header = () => {
  return (
    <HeaderWrapper>
      <nav id="top__nav">nav</nav>
      <HeaderInner>
        <div id="header__logo">KREAM</div>
        <nav id="main__nav">nav</nav>
        <input type="text" id="search-bar"></input>
      </HeaderInner>
    </HeaderWrapper>
  );
};
const HeaderWrapper = styled.header`
  width: 1440px;
  height: 180px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
`;
const HeaderInner = styled.div`
  display: flex;
  #header__logo {
    font-size: ${theme.fontSize.title2};
    font-weight: bold;
  }
`;
export default Header;
