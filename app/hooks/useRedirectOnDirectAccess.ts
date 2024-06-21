import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

const useRedirectOnDirectAccess = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const isInternalNavigation = sessionStorage.getItem('internalNavigation');

    if (!isInternalNavigation && pathname !== '/') {
      router.push('/');
    }

    sessionStorage.removeItem('internalNavigation');
  }, [router]);
};

export default useRedirectOnDirectAccess;
