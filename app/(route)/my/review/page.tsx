'use client';
import ReviewPost from '@/components/Review/ReviewPost';
import Button from '@/components/common/Button';
import RenderPageNumbers from '@/components/common/Paging';
import { useGetMyReviews } from '@/hooks/queries/useReview';
import theme from '@/styles/theme';
import { useState } from 'react';
import styled from 'styled-components';

export interface ReviewDetails {
  id: number;
  productName: string;
  dealNumber: number;
  dealPrice: number;
  productImage: string;
}

const PostReview = () => {
  const [isSelected, setIsSelected] = useState([0, 1]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewDetails, setReviewDetails] = useState<ReviewDetails | null>(
    null
  );
  const { data: reviewList, refetch: refetch } = useGetMyReviews();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const openModal = (details: ReviewDetails) => {
    setReviewDetails(details);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setReviewDetails(null);
    refetch();
  };

  if (!reviewList?.result) return <>loading...</>;

  const totalPages = Math.ceil(reviewList.result.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedReviews = reviewList.result.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  return (
    <>
      <h2>리뷰 작성</h2>
      <OptionSelect>
        <OptionTitle
          isselected={isSelected[0]}
          onClick={() => setIsSelected([0, 1])}
        >
          작성 가능
        </OptionTitle>
        <OptionTitle
          isselected={isSelected[1]}
          onClick={() => setIsSelected([1, 0])}
        >
          작성 완료
        </OptionTitle>
      </OptionSelect>
      <ReviewsList>
        {selectedReviews.map((review, index) => (
          <ReviewItem key={index}>
            <OrderInfo>상품번호: {review.productNumber}</OrderInfo>
            <ProductInfo>
              <ProductImage
                src={review.productImage}
                alt={review.productImage}
              />
              <ProductDetails>
                <ProductName>{review.productName}</ProductName>
                <ProductOption>옵션 : {review.dealSize}</ProductOption>
                <ReviewDeadline>
                  작성기한: {review.writeDeadLine}
                </ReviewDeadline>
              </ProductDetails>
              <ReviewAction>
                <Button
                  onClick={() =>
                    openModal({
                      id: review.productNumber,
                      productName: review.productName,
                      dealNumber: review.dealNumber,
                      dealPrice: review.dealPrice,
                      productImage: review.productImage,
                    })
                  }
                  buttonColor="buying"
                  size="medium"
                  styles={{
                    fontSize: theme.fontSize.body2,
                    marginTop: '-1.5rem',
                  }}
                >
                  리뷰작성
                </Button>
              </ReviewAction>
            </ProductInfo>
          </ReviewItem>
        ))}
      </ReviewsList>
      <RenderPageNumbers
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
      {isModalOpen && (
        <ReviewPost
          closeModal={closeModal}
          reviewDetails={reviewDetails}
        ></ReviewPost>
      )}
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

const OptionTitle = styled.p<{ isselected: number }>`
  width: 50%;
  text-align: center;
  font-size: ${theme.fontSize.title1};
  font-weight: bold;
  line-height: 5rem;
  border-bottom: ${(props) =>
    props.isselected === 0 ? '0.3rem solid black' : 'none'};
  color: ${(props) =>
    props.isselected === 0 ? 'black' : theme.colors.gray[200]};
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
`;

const ProductImage = styled.img`
  width: 13rem;
  height: 10rem;
  margin-right: 1rem;
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProductName = styled.p`
  font-size: ${theme.fontSize.subtitle1};
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const ProductOption = styled.p`
  font-size: ${theme.fontSize.subtitle2};
  color: ${theme.colors.gray[200]};
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

export default PostReview;
