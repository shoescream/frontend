'use client';
import theme from '@/styles/theme';
import { useState } from 'react';
import styled from 'styled-components';

const PostReview = () => {
  const [isSelected, setIsSelected] = useState([0, 1]);
  return (
    <>
      <h2>리뷰 작성</h2>
      <OptionSelect>
        <OptionTitle
          isSelected={isSelected[0]}
          onClick={() => setIsSelected([0, 1])}
        >
          작성 가능
        </OptionTitle>
        <OptionTitle
          isSelected={isSelected[1]}
          onClick={() => setIsSelected([1, 0])}
        >
          작성 완료
        </OptionTitle>
      </OptionSelect>
      <ReviewsList>
        <ReviewItem>
          <OrderInfo>주문번호: #1</OrderInfo>
          <ProductInfo>
            <ProductImage src="path/to/image1.jpg" alt="Product 1" />
            <ProductDetails>
              <ProductName>
                나이키 V2K 런 퓨어 플래티넘 라이트 아이언 오어
              </ProductName>
              <ReviewAction>
                <ReviewDeadline>작성기한: D-14</ReviewDeadline>
                <ReviewButton>리뷰작성</ReviewButton>
              </ReviewAction>
            </ProductDetails>
          </ProductInfo>
        </ReviewItem>
      </ReviewsList>
    </>
  );
};

const OptionSelect = styled.div`
  width: 90rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  margin-bottom: 3rem;
`;

const OptionTitle = styled.p<{ isSelected: number }>`
  width: 50%;
  text-align: center;
  font-size: ${theme.fontSize.title1};
  font-weight: bold;
  line-height: 5rem;
  border-bottom: ${(props) =>
    props.isSelected === 0 ? '0.3rem solid black' : 'none'};
  color: ${(props) =>
    props.isSelected === 0 ? 'black' : theme.colors.gray[200]};
  cursor: pointer;
`;

const ReviewsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border: 1px solid #d3d3d3;
  border-radius: 5px;
`;

const OrderInfo = styled.div`
  font-size: ${theme.fontSize.body2};
  color: #007bff;
  margin-bottom: 1rem;

  a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProductImage = styled.img`
  width: 5rem;
  height: 5rem;
  margin-right: 1rem;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProductName = styled.div`
  font-size: ${theme.fontSize.body1};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ReviewAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReviewDeadline = styled.div`
  color: #ff6f61;
  font-size: ${theme.fontSize.body2};
`;

const PointsInfo = styled.div`
  color: #ff6f61;
  font-size: ${theme.fontSize.body2};
  border: 1px solid #ff6f61;
  border-radius: 5px;
  padding: 0.5rem;
`;

const ReviewButton = styled.button`
  background-color: #ff6f61;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
export default PostReview;
