'use client';
import { useDetailProduct } from '@/hooks/queries/useProduct';
import theme from '@/styles/theme';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import useAddComma from '@/hooks/useAddComma';
import { useParams, usePathname } from 'next/navigation';
import Button from '../common/Button';
import { usePayment, useSellNow } from '@/hooks/queries/usePayment';
import LocalStorage from '@/utils/localStorage';

interface ProductPayPageProps {
  resultAmount: number;
}

const ProductPayPage = ({
  children,
  resultAmount,
}: PropsWithChildren<ProductPayPageProps>) => {
  const pathname = usePathname();
  const addComma = useAddComma();
  const PATH = pathname.split('/')[1];
  const PRODUCT_NUMBER = pathname.replace(
    pathname.startsWith('/sell') ? '/sell/' : '/buy/',
    ''
  );
  const { size } = useParams();
  const { data } = useDetailProduct(PRODUCT_NUMBER);
  const { mutate: mutatePayment } = usePayment();
  const { mutate: mutateSellNow } = useSellNow();

  const handlePayment = async () => {
    mutatePayment({
      item_name: data?.productResponse.productName!,
      total_amount: resultAmount,
    });
  };

  const handleSellNow = async () => {
    console.log({
      productNumber: Number(PRODUCT_NUMBER),
      size: String(size),
      price: data?.productResponse.price, // TODO: 입찰/즉시구매에서 넘어온 값으로 변경할 것.
    });
    mutateSellNow({
      productNumber: Number(PRODUCT_NUMBER),
      // size: String(SIZE),
      size: '225',
      // price: 106000,
      price: 96500,
    });
  };

  return (
    <Container
      style={{
        width: window.innerWidth,
        fontFamily: theme.fonts.pretendard,
      }}
    >
      <div style={{ margin: '0 auto', width: '70rem' }}>
        <Section>
          <Image
            src={data?.productResponse.productImageResponse.productImage[0]!}
            alt="product image"
            width={80}
            height={80}
            style={{ borderRadius: '1rem', objectFit: 'cover' }}
          />
          <div style={{ paddingLeft: '1.6rem' }}>
            <div style={{ marginTop: '0.1rem' }}>
              <strong
                style={{
                  fontSize: theme.fontSize.body1,
                  fontWeight: 600,
                }}
              >
                {data?.productResponse.productCode}
              </strong>
            </div>
            <div style={{ marginTop: '0.1rem' }}>
              <p
                style={{
                  fontSize: theme.fontSize.body1,
                  fontWeight: 300,
                }}
              >
                {data?.productResponse.productName}
              </p>
            </div>
            <div style={{ marginTop: '0.2rem' }}>
              <p
                style={{
                  fontSize: theme.fontSize.body2,
                  color: theme.colors.text.secondary,
                }}
              >
                {data?.productResponse.productSubName}
              </p>
            </div>
            <div style={{ marginTop: '0.7rem' }}>
              <strong
                style={{
                  fontSize: theme.fontSize.body1,
                }}
              >
                {size}
              </strong>
            </div>
          </div>
        </Section>
        {children}
        <Section>
          <Button
            buttonColor={PATH === 'sell' ? 'selling' : 'buying'}
            styles={{ border: 'none', height: '5.2rem' }}
            onClick={() =>
              PATH === 'sell' ? handleSellNow() : handlePayment()
            }
          >
            <span
              style={{
                fontSize: theme.fontSize.subtitle2,
                fontWeight: '600',
                fontFamily: theme.fonts.pretendard,
              }}
            >
              {addComma(resultAmount) + '원'}
            </span>
            <span
              style={{
                fontSize: theme.fontSize.subtitle2,
                margin: '0rem 0.6rem',
                fontWeight: '700',
                color: '#FFFFFFA6',
                fontFamily: theme.fonts.pretendard,
              }}
            >
              •
            </span>
            <span
              style={{
                fontSize: theme.fontSize.subtitle2,
                fontWeight: '600',
                fontFamily: theme.fonts.pretendard,
              }}
            >
              {PATH === 'buy' ? '카카오 페이로 결제하기' : '판매하기'}
            </span>
          </Button>
        </Section>
      </div>
    </Container>
  );
};

export default ProductPayPage;

const Container = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  padding: 2rem 4rem 16rem;
`;

const Section = styled.section`
  width: 70rem;
  background-color: white;
  padding: 3.2rem;
  display: flex;
  margin-top: 0.8rem;

  &:nth-child(1) {
    margin-top: 0;
  }
  &:nth-child(2) {
    flex-direction: column;
  }
  &:nth-child(5) {
    flex-direction: column;
  }
  &:nth-child(6) {
    padding: 2.4rem 3.2rem 3.2rem;
  }
`;
