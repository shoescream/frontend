import theme from '@/styles/theme';
import styled from 'styled-components';
import { FaEllipsisV, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDeleteReview, useProductReviews } from '@/hooks/queries/useReview';
import moment from 'moment';
import { useState } from 'react';
import RenderPageNumbers from '../common/Paging';
import UpdateReview from '../Review/ReviewUpdate';

interface ReviewProps {
  productNumber: number;
  productName?: string;
  productImage?: string[];
}
const Review = ({ productNumber, productName, productImage }: ReviewProps) => {
  const productReview = useProductReviews(productNumber);
  const deleteReview = useDeleteReview();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviewNumber, setReviewNumber] = useState<number>(0);
  const itemsPerPage = 8;

  const result = productReview.data?.result;

  const user = localStorage.getItem('@user');
  let memberId = '';
  if (user !== null) memberId = JSON.parse(user).memberId;
  if (!result) return <>...loading</>;
  const totalPages = Math.ceil(result.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedReviews = result.slice(startIndex, startIndex + itemsPerPage);
  const closeModal = () => {
    setIsModalOpen(!isModalOpen);
    setSelectedReview(null);
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleMoreClick = (reviewId: number) => {
    setSelectedReview(selectedReview === reviewId ? null : reviewId);
  };

  const handleEdit = async (reviewNumber: number) => {
    setIsModalOpen(true);
    setReviewNumber(reviewNumber);
  };

  const handleDelete = (reviewNumber: number) => {
    deleteReview.mutate(reviewNumber);
    closeModal();
  };
  return (
    <>
      <Title>Review</Title>
      <Container>
        {selectedReviews.map((review, idx) => (
          <ReviewContainer key={idx}>
            <UserProfile>
              <img src="/profile_ex.png"></img>
              <UserNameRank>
                <p id="userName">{review.memberId}</p>
                <p id="userRank">1Lv</p>
              </UserNameRank>
              <p id="createAt">
                {moment(review.createdAt).format('YYYY-MM-DD')}
              </p>
              {review.memberId === memberId && (
                <MoreButton
                  onClick={() => handleMoreClick(review.reviewNumber)}
                >
                  <FaEllipsisV />
                </MoreButton>
              )}
              {selectedReview === review.reviewNumber && (
                <OptionsMenu>
                  <OptionItem onClick={() => handleEdit(review.reviewNumber)}>
                    수정하기
                  </OptionItem>
                  <OptionItem onClick={() => handleDelete(review.reviewNumber)}>
                    삭제하기
                  </OptionItem>
                </OptionsMenu>
              )}
            </UserProfile>
            <StarsWrapper>
              {' '}
              {Array.from({ length: review.rating }, (_, index) => (
                <FaStar key={index} className="stars" color="gold" />
              ))}
            </StarsWrapper>
            <Option>{productName}</Option>
            <Swiper
              style={{
                width: '100%',
                height: '12rem',
                backgroundColor: '#ebf0f4',
              }}
            >
              {review.reviewImages.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={img}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
            <Description>{review.reviewTitle}</Description>
          </ReviewContainer>
        ))}
      </Container>
      {RenderPageNumbers({ currentPage, totalPages, handlePageChange })}
      {isModalOpen && (
        <UpdateReview
          closeModal={closeModal}
          reviewNumber={reviewNumber}
          productImage={productImage}
          productName={productName}
        ></UpdateReview>
      )}
    </>
  );
};

export default Review;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding-top: 1.5rem;
  justify-items: center;
`;

const ReviewContainer = styled.div`
  width: 26rem;
  height: 32rem;
  border-radius: 1rem;
  border: 0.1rem solid ${theme.colors.gray[200]};
  margin-bottom: 1rem;
`;

const UserProfile = styled.div`
  position: relative;
  margin: 1rem 0 0 1rem;
  img {
    width: 4rem;
    float: left;
    margin-right: 1rem;
  }
  #createAt {
    position: absolute;
    top: 0.5rem;
    right: 1.5rem;
    font-size: ${theme.fontSize.caption2};
  }
`;

const UserNameRank = styled.div`
  line-height: 2rem;
  font-size: ${theme.fontSize.subtitle3};
  #userRank {
    font-size: ${theme.fontSize.caption2};
  }
`;

const Title = styled.h2`
  /* border-bottom: 0.1rem solid ${theme.colors.gray[200]}; */
  padding: 1rem;
  margin-top: 4rem;
`;

const StarsWrapper = styled.div`
  width: 15rem;
  padding-left: 1rem;
  .stars {
    margin: 0.5rem;
  }
`;

const Option = styled.p`
  font-size: ${theme.fontSize.caption3};
  padding-left: 0.5rem;
  margin-left: 0.5rem;
  margin-bottom: 1rem;
  border-left: 0.2rem solid ${theme.colors.gray[600]};
`;

const Description = styled.div`
  padding: 1rem;
  font-size: ${theme.fontSize.caption1};
  width: 100%;
  height: 8rem;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
`;

const MoreButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: ${theme.fontSize.caption1};
  color: ${theme.colors.gray[600]};
  display: flex;
  align-items: center;
  position: absolute;
  top: 0.6rem;
  right: 0.1rem;
`;

const OptionsMenu = styled.div`
  position: absolute;
  top: 2rem;
  right: 0.5rem;
  background-color: white;
  border: 0.1rem solid ${theme.colors.gray[200]};
  border-radius: 0.5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const OptionItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;
  &:hover {
    background-color: ${theme.colors.gray[100]};
  }
`;
