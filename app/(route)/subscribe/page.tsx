'use client';

import { useSubscribeNotifications } from '@/hooks/queries/useSubscribeNotifications';
import LocalStorage from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Subscribe = () => {
  const router = useRouter();
  const user = JSON.parse(LocalStorage.getItem('@user')!).memberId;
  useSubscribeNotifications({ memberId: user?.memberId });

  useEffect(() => {
    router.push('/');
  }, [router]);

  return <div></div>;
};

export default Subscribe;
