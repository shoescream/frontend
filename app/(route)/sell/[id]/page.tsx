'use client';

import ProductPayPage from '@/components/ProductPayPage/ProductPayPage';
import { useRouter } from 'next/navigation';
import React from 'react';

const Sell = () => {
  const router = useRouter();
  console.log(router);

  // if (size && Number(step) === 2) {
  //   return <ProductPayPage id={id!} size={size} />;
  // }

  return <ProductPayPage id={'0'} size={'0'} />;
};

export default Sell;
