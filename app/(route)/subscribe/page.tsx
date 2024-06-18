'use client';

import { useSubscribeNotifications } from '@/hooks/queries/useSubscribeNotifications';
import LocalStorage from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Subscribe = () => {
  const router = useRouter();
  const userData = LocalStorage.getItem('@user');
  const user = userData ? JSON.parse(userData) : null;

  const { memberId } = user || {};
  useSubscribeNotifications({ memberId });

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [router, user]);

  return <div></div>;
};

export default Subscribe;
