'use client';

import BuyAsk from '@/components/ProductPayPage/BuyAsk';
import BuyReal from '@/components/ProductPayPage/BuyReal';

import { useSearchParams, useRouter } from 'next/navigation';

const BuyProduct = () => {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get('type') ?? '';
  const size = params.get('size') ?? '';

  let Component;
  if (type === 'ask') {
    Component = BuyAsk;
  } else if (type === 'buy') {
    Component = BuyReal;
  } else {
    router.replace('/404');
    return null;
  }

  return <Component />;
};

export default BuyProduct;
