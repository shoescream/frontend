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
    const canAccess = LocalStorage.getItem('canAccessSubscribe');

    if (!user || !canAccess) {
      router.push('/login');
    }

    if (canAccess) {
      LocalStorage.removeItem('canAccessSubscribe');
      router.back();
    }
  }, [router, user]);

  return <div></div>;
};

export default Subscribe;
