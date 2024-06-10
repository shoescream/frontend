'use client';
import ReviewPost from '@/components/Review/ReviewPost';
import Button from '@/components/common/Button';
import useAddComma from '@/hooks/useAddComma';
import theme from '@/styles/theme';
import { useState } from 'react';
import styled from 'styled-components';

interface ReviewDetails {
  id: number;
  productName: string;
}

const PostReview = () => {
  const [isSelected, setIsSelected] = useState([0, 1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewDetails, setReviewDetails] = useState<ReviewDetails | null>(
    null
  );

  const openModal = (details: ReviewDetails) => {
    setReviewDetails(details);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReviewDetails(null);
  };

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
                <Button
                  onClick={() =>
                    openModal({
                      id: 1,
                      productName:
                        '나이키 V2K 런 퓨어 플래티넘 라이트 아이언 오어',
                    })
                  }
                  buttonColor="buying"
                  size="medium"
                  styles={{ fontSize: theme.fontSize.body2 }}
                >
                  리뷰작성
                </Button>
              </ReviewAction>
            </ProductDetails>
          </ProductInfo>
        </ReviewItem>
      </ReviewsList>
      {isModalOpen && <ReviewPost closeModal={closeModal}></ReviewPost>}
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
  width: 10rem;
  height: 10rem;
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

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99;
`;

const ModalContent = styled.div`
  width: 70rem;
  background: white;
  padding: 2rem;
  border-radius: 0.5rem;
  position: relative;
`;

const CloseButton = styled.span`
  position: absolute;
  top: 1rem;
  right: 1rem;
  font-size: 2rem;
  cursor: pointer;
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const ModalProductImage = styled.img`
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  margin-right: 1rem;
`;

const ModalProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductPrice = styled.div`
  color: #ff6f61;
  font-size: ${theme.fontSize.body2};
  margin-bottom: 0.5rem;
  font-weight: bold;
`;

const RatingSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const RatingStars = styled.div`
  font-size: 4rem;
  color: #ff6f61;
`;

const ImagesSection = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 1rem;
`;

const ImagePreview = styled.img`
  width: 10rem;
  height: 10rem;
  border-radius: 0.5rem;
  background-color: ${theme.colors.gray[200]};
`;

const AddImageButton = styled.button`
  width: 10rem;
  height: 10rem;
  background-color: ${theme.colors.gray[100]};
  border: 0.1rem dashed ${theme.colors.gray[200]};
  border-radius: 0.5rem;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  border: 0.1rem solid ${theme.colors.gray[100]};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const Tags = styled.div`
  margin-bottom: 1rem;
  font-size: ${theme.fontSize.body2};
  color: ${theme.colors.gray[500]};
`;

const SubmitButton = styled.button`
  background-color: #3b3b3b;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default PostReview;
