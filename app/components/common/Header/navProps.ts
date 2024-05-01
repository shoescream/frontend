const TOP_NAV_DATA = [
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
const MAIN_NAV_DATA = [
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

export const NAV_DATA = {
  TOP_NAV_DATA,
  MAIN_NAV_DATA,
};
