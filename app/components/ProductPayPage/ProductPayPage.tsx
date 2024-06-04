'use client';
import { useDetailProduct } from '@/hooks/queries/useProduct';
import theme from '@/styles/theme';
import Image from 'next/image';
import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import useAddComma from '@/hooks/useAddComma';
import { usePathname } from 'next/navigation';
import Button from '../common/Button';
import { usePayment } from '@/hooks/queries/usePayment';

interface ProductPayPageProps {
  resultAmount: number;
}

const ProductPayPage = ({
  children,
  resultAmount,
}: PropsWithChildren<ProductPayPageProps>) => {
  const pathname = usePathname();
  const productNumber = pathname.replace('/sell/', '');
  const size = 245;
  const { data } = useDetailProduct(productNumber);
  const { mutate } = usePayment();
  const addComma = useAddComma();

  const handlePayment = async () => {
    mutate({
      item_name: data?.productResponse.productName!,
      total_amount: resultAmount,
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
                  fontSize: '1.4rem',
                  fontWeight: 600,
                }}
              >
                {data?.productResponse.productCode}
              </strong>
            </div>
            <div style={{ marginTop: '0.1rem' }}>
              <p
                style={{
                  fontSize: '1.4rem',
                  fontWeight: 300,
                }}
              >
                {data?.productResponse.productName}
              </p>
            </div>
            <div style={{ marginTop: '0.2rem' }}>
              <p
                style={{
                  fontSize: '1.3rem',
                  color: theme.colors.text.secondary,
                }}
              >
                {data?.productResponse.productSubName}
              </p>
            </div>
            <div style={{ marginTop: '0.7rem' }}>
              <strong
                style={{
                  fontSize: '1.4rem',
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
            buttonColor={pathname.startsWith('/sell') ? 'selling' : 'buying'}
            styles={{ border: 'none', height: '5.2rem' }}
            onClick={() =>
              pathname.startsWith('/buy') ? handlePayment() : null
            }
          >
            <span
              style={{
                fontSize: '1.6rem',
                fontWeight: '600',
                fontFamily: theme.fonts.pretendard,
              }}
            >
              {addComma(resultAmount) + '원'}
            </span>
            <span
              style={{
                fontSize: '1.6rem',
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
                fontSize: '1.6rem',
                fontWeight: '600',
                fontFamily: theme.fonts.pretendard,
              }}
            >
              {pathname.startsWith('/buy')
                ? '카카오 페이로 결제하기'
                : '판매하기'}
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
