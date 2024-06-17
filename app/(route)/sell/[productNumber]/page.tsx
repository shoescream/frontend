'use client';

import SellAsk from '@/components/ProductPayPage/SellAsk';
import SellReal from '@/components/ProductPayPage/SellReal';

import { useRouter, useSearchParams } from 'next/navigation';

const SellProduct = () => {
  const router = useRouter();
  const params = useSearchParams();
  const type = params.get('type') ?? '';
  const size = params.get('size') ?? '';

  let Component;
  if (type === 'ask') {
    Component = SellAsk;
  } else if (type === 'sell') {
    Component = SellReal;
  } else {
    router.replace('/404');
    return null;
  }

  return <Component />;
};

export default SellProduct;
