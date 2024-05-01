import styled from 'styled-components';
import theme from '../../../styles/theme';
import MultiNavBar from './NavBar';
const Header = () => {
  const dummy = [
    {
      title: '고객센터',
      event: () => {
        console.log('고객센터');
      },
    },
    {
      title: '마이페이지',
      event: () => {
        console.log('마이페이지');
      },
    },
    {
      title: '관심상품',
      event: () => {
        console.log('관심상품');
      },
    },
    {
      title: '알림',
      event: () => {
        console.log('알림');
      },
    },
    {
      title: '로그인',
      event: () => {
        console.log('로그인');
      },
    },
  ];
  const mainDummy = [
    {
      title: '홈',
      event: () => {
        console.log('홈');
      },
    },
    {
      title: '랭킹',
      event: () => {
        console.log('랭킹');
      },
    },
    {
      title: 'SHOP',
      event: () => {
        console.log('SHOP');
      },
    },
    {
      title: '이벤트',
      event: () => {
        console.log('이벤트');
      },
    },
  ];
  return (
    <HeaderWrapper>
      <HeaderTop>
        <MultiNavBar type="top" data={dummy} />
      </HeaderTop>
      <HeaderInner>
        <div id="header__logo">KREAM</div>
        <MultiNavBar type="main" data={mainDummy} />
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
