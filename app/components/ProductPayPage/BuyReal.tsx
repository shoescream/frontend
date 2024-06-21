'use client';

import ProductBuyPage from '@/components/ProductPayPage/ProductPayPage';
import useAddComma from '@/hooks/useAddComma';
import React from 'react';
import styled from 'styled-components';
import { IoIosArrowForward } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import theme from '@/styles/theme';
import { usePathname } from 'next/navigation';

const TABLE_ITEM = [
  {
    title: '검수비',
    value: '무료',
  },
  {
    title: '수수료',
    value: '2900',
  },
  {
    title: '쿠폰 사용',
    value: '-',
  },
  {
    title: '포인트 사용',
    value: '-',
  },
];

interface FormData {
  point: number;
}

const BuyReal = () => {
  const addComma = useAddComma();
  const pathname = usePathname();
  const productNumber = pathname.replace('/buy/', '');
  const value = 89000;
  const sum =
    value +
    TABLE_ITEM.map((el) =>
      isNaN(Number(el.value)) ? 0 : Number(el.value)
    ).reduce((a, b) => a + b);
  const points = Math.ceil(sum * 0.01 + 0.1);
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
    <ProductBuyPage resultAmount={sum}>
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
      <Section>
        <div style={{ width: '100%' }}>
          <p style={{ fontSize: '1.6rem', fontWeight: 500 }}>최종 주문 정보</p>
          <Row>
            <Category>즉시 구매가</Category>
            <strong style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              {addComma(value)}원
            </strong>
          </Row>
          {TABLE_ITEM.map((item) => (
            <Row key={item.title}>
              <TableItem>{item.title}</TableItem>
              <TableItemValue>
                {!isNaN(Number(item.value))
                  ? addComma(Number(item.value))
                  : item.value}
              </TableItemValue>
            </Row>
          ))}
        </div>
      </Section>
      <ResultSection>
        <Total>총 결제금액</Total>
        <TotalValue>{addComma(sum)}원</TotalValue>
      </ResultSection>
      <PointSection>
        <Total>포인트 혜택</Total>
        <Divider />
        <Row style={{ margin: 0 }}>
          <Category style={{ padding: 0 }}>적립 예정 포인트</Category>
          <Points>{addComma(points)}P</Points>
        </Row>
      </PointSection>
    </ProductBuyPage>
  );
};

export default BuyReal;

const Section = styled.section`
  width: 70rem;
  background-color: white;
  padding: 3.2rem;
  display: flex;
  margin-top: 0.8rem;

  &:nth-child(2) {
    flex-direction: column;
  }
`;

const PointSection = styled(Section)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 15rem;
`;

const Title = styled.p`
  font-size: ${theme.fontSize.title2};
  font-weight: 600;
`;

const Category = styled.h4`
  padding: 1.2rem 0 0.8rem;
  font-size: ${theme.fontSize.subtitle3};
  font-weight: 300;
`;

const SearchCouponButton = styled.button<{ disabled: boolean }>`
  background-color: ${(props) => (props.disabled ? '#fafafa' : 'white')};
  position: relative;
  border: 0.1rem solid #ebebeb;
  border-radius: 1rem;
  font-size: ${theme.fontSize.body1};
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
  font-size: ${theme.fontSize.caption1};
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
  font-size: ${theme.fontSize.body1};
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
  font-size: ${theme.fontSize.body1};
  margin-top: 1.1rem;
  position: relative;
  color: #22222270;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.6rem;
  padding: 0.4rem 0;

  &:nth-child(2) {
    margin: 0;
    padding: 0;
  }
`;

const TableItem = styled.div`
  color: #22222250;
  min-width: 6.6rem;
  font-size: ${theme.fontSize.body1};
`;

const TableItemValue = styled.div`
  font-size: ${theme.fontSize.body1};
  color: ${theme.colors.main};
`;

const ResultSection = styled.section`
  width: 100%;
  padding: 2rem 3.2rem;
  background-color: rgb(250, 250, 250);
  border-top: 0.1rem solid rgb(240, 240, 240);
  border-bottom: 0.1rem solid rgb(240, 240, 240);
`;

const Total = styled.p`
  color: ${theme.colors.main};
  font-size: ${theme.fontSize.subtitle2};
  font-weight: 600;
`;

const TotalValue = styled.p`
  padding-top: 0.8rem;
  color: ${theme.colors.main};
  font-size: ${theme.fontSize.title1};
  font-weight: 700;
  text-align: right;
`;

const Divider = styled.div`
  background-color: rgb(240, 240, 240);
  height: 0.1rem;
  width: 100%;
`;

const Points = styled.p`
  color: rgb(124, 114, 238);
  font-weight: 700;
  font-size: ${theme.fontSize.body1};
`;
