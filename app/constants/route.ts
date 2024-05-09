type Route = {
  [key: string]: string;
};

export const route: Route = {
  home: '/',
  join: '/join',
  login: '/login',
  my: '/my',
} as const;
