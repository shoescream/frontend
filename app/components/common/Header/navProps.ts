const TOP_NAV_DATA = (token: string) => [
  // {
  //   title: '고객센터',
  //   path: '/center',
  // },
  {
    title: '마이페이지',
    path: token ? '/my' : '/login',
  },
  // {
  //   title: '관심상품',
  //   path: token ? '/favorites' : '/login',
  // },
];
const MAIN_NAV_DATA = [
  {
    title: '홈',
    path: '/',
  },
  {
    title: '랭킹',
    path: '/ranking',
  },
  {
    title: 'SHOP',
    path: '/shop',
  },
  // {
  //   title: '이벤트',
  //   path: '/event',
  // },
];

export const NAV_DATA = {
  TOP_NAV_DATA,
  MAIN_NAV_DATA,
};
