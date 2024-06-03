import ProductPayPage from '@/components/ProductPayPage/ProductPayPage';
import { useSearchParams } from 'next/navigation';
import React from 'react';

const Buy = () => {
  // const searchParams = useSearchParams();
  // const id = searchParams.get('id');
  // const size = searchParams.get('size');
  // const step = searchParams.get('step');

  // if (size && Number(step) === 2) {
  //   return <ProductPayPage id={id!} size={size} />;
  // }

  return <ProductPayPage id={'0'} size={'0'} />;
};

export default Buy;
