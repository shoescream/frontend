'use client';
import { useDetailProduct } from '@/hooks/queries/useProduct';
import theme from '@/styles/theme';
import Image from 'next/image';
import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import Input from '../common/Input';
import { useForm } from 'react-hook-form';

interface FormData {
  point: number;
}

interface ProductPayPage {
  id: string;
  size: string;
}

const ProductPayPage = ({ id, size }: ProductPayPage) => {
  const { data } = useDetailProduct(id);
  const hasNoCoupon = true;
  const totalPoints = 0;
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      point: 0,
    },
  });

  return (
    <Container
      style={{
        width: window.innerWidth,
      }}
    >
      <div style={{ margin: '0 auto', width: '70rem' }}>
        <Section>
          <Image
            // src={data?.productResponse.productImageResponse.productImage[0]!}
            src={
              'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?q=80&w=2400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            }
            alt="product image"
            width={80}
            height={80}
            style={{ borderRadius: '1rem', objectFit: 'cover' }}
          />
          <div style={{ paddingLeft: '1.6rem', height: '8rem' }}>
            {/* <strong>{data?.productResponse.productCode}</strong>
          <p>{data?.productResponse.productName}</p>
          <p>{data?.productResponse.productSubName}</p>
          <strong>{size}</strong> */}
            <strong style={{ fontSize: '1.4rem' }}>1203A549-400</strong>
            <p
              style={{
                fontSize: '1.4rem',
                marginTop: '0.1rem',
                fontWeight: 300,
              }}
            >
              Asics Unlimited Gel-Kayano 14 Mist Cream
            </p>
            <p
              style={{
                fontSize: '1.3rem',
                color: theme.colors.text.secondary,
                marginTop: '0.2rem',
              }}
            >
              아식스 언리미티드 젤 카야노 14 미스트 크림
            </p>
            <p
              style={{
                marginTop: '0.7rem',
                fontSize: '1.4rem',
                fontWeight: 700,
              }}
            >
              230
            </p>
          </div>
        </Section>
        <Section>
          <Title>할인 혜택</Title>
          <Category>쿠폰</Category>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <SearchCouponButton disabled={hasNoCoupon}>
              사용 가능한 쿠폰이 없습니다.
              <IoIosArrowForward color={hasNoCoupon ? '#22222230' : '#222'} />
            </SearchCouponButton>
            <MaxiumButton disabled={hasNoCoupon}>최대 사용</MaxiumButton>
          </div>
          <Category>포인트</Category>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <StyledInput
              type="number"
              {...register('point', { max: 500 })}
              max={500}
              readOnly={!totalPoints}
            />
            <MaxiumButton disabled={!totalPoints}>최대 사용</MaxiumButton>
          </div>
          <HelperText>
            보유 포인트{' '}
            <span style={{ color: theme.colors.main }}>{totalPoints}P</span>
          </HelperText>
        </Section>
      </div>
    </Container>
  );
};

export default ProductPayPage;

const Container = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  height: 50rem;
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
`;

const Title = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;

const Category = styled.h4`
  padding: 1.2rem 0 0.8rem;
  font-size: 1.5rem;
  font-weight: 400;
`;

const SearchCouponButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? '#fafafa' : 'white')};
  position: relative;
  border: 0.1rem solid #ebebeb;
  border-radius: 1rem;
  font-size: 1.4rem;
  height: 4.8rem;
  margin-right: 0.8rem;
  text-align: left;
  width: calc(100% - 7.6rem);
  padding: 1.4rem 1.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => (props.disabled ? '#22222230' : '#222')};
  cursor: pointer;
`;

const MaxiumButton = styled.button<{ disabled: boolean }>`
  border-width: 0.1rem;
  border-style: solid;
  border-color: ${(props) => (props.disabled ? 'white' : '#22222260')};
  border-radius: 1.2rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  color: ${(props) => (props.disabled ? 'white' : '#222')};
  background-color: ${(props) =>
    props.disabled ? 'rgba(34,34,34,.2)' : 'white'};
`;

const StyledInput = styled.input<{ readOnly: boolean }>`
  width: calc(100% - 7.6rem);
  padding: 1.4rem 1.2rem;
  border: 0.1rem solid #ebebeb;
  border-radius: 1rem;
  font-size: 1.4rem;
  height: 4.8rem;
  margin-right: 0.8rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;
  outline: none;
  cursor: ${(props) => (props.readOnly ? 'not-allowed' : 'default')};
  color: ${(props) => (props.readOnly ? '#ebebeb' : '#222')};
`;

const HelperText = styled.div`
  font-size: 1.4rem;
  margin-top: 1.1rem;
  position: relative;
  color: #22222270;
`;
