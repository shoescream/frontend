'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const MyPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('/my/profile');
  }, []);

  return <div></div>;
};

export default MyPage;
