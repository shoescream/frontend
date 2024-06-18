import LocalStorage from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const token = LocalStorage.getItem('@token');

  if (!token) {
    router.push('/login');
  }

  return <div>{children}</div>;
};

export default AuthLayout;
