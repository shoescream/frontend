import theme from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';
import { PiPackage } from 'react-icons/pi';
import useAddComma from '@/hooks/useAddComma';

const Options = () => {
  const addComma = useAddComma();

  return (
    <>
      <OptionBox>
        <Flex>
          <OptionTitle>추가 혜택</OptionTitle>
          <SeeMoreOptions>더보기</SeeMoreOptions>
        </Flex>
        <div style={{ paddingTop: '2rem' }}>
          <CategoryName>
            <Point>포인트</Point>
            <PointDetail>
              포인트로 결제 시 <strong>1%</strong> 적립
            </PointDetail>
          </CategoryName>
          <CategoryName>
            <Point>VIP</Point>
            <PointDetail>
              <strong>1%</strong> 추가 적립
            </PointDetail>
          </CategoryName>
        </div>
      </OptionBox>
      <OptionBox>
        <Flex>
          <OptionTitle>배송 정보</OptionTitle>
        </Flex>
        <div style={{ paddingTop: '2rem' }}>
          <CategoryName>
            <Point style={{ marginTop: '0.2rem', color: theme.colors.main }}>
              <PiPackage size={30} />
            </Point>
            <div>
              <PointDetail>일반배송 {addComma(3000)}원</PointDetail>
              <br />
              <PointDetail
                style={{
                  color: theme.colors.gray[200],
                }}
              >
                검수 후 배송
              </PointDetail>
            </div>
          </CategoryName>
        </div>
      </OptionBox>
    </>
  );
};

export default Options;

const OptionBox = styled.div`
  padding: 4rem 0 2rem;
  border-bottom: 0.1rem solid #f0f0f0;
`;

const OptionTitle = styled.span`
  font-size: 1.4rem;
  font-weight: 400;
  color: ${theme.colors.main};
`;

const SeeMoreOptions = styled.span`
  font-size: 1.3rem;
  font-weight: 400;
  color: ${theme.colors.text.secondary};
  cursor: pointer;
`;

const CategoryName = styled.div`
  font-size: 1.4rem;
  line-height: 1.7rem;
  display: flex;
  align-items: center;
  &:nth-child(2) {
    margin-top: 0.5rem;
  }
`;

const Point = styled.span`
  color: ${theme.colors.text.secondary};
  width: 4rem;
  font-size: 1.2rem;
  margin-right: 1rem;
`;

const PointDetail = styled.span`
  font-size: 1.3rem;
  color: ${theme.colors.main};
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;
