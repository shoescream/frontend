import theme from '@/styles/theme';
import styled from 'styled-components';
import { FaStar } from 'react-icons/fa';
import { FaStarHalf } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useProductReviews } from '@/hooks/queries/useReview';

interface ReviewProps {
  productNumber: number;
}
const Review = ({ productNumber }: ReviewProps) => {
  const productReview = useProductReviews(productNumber);
  console.log(productReview.data);
  const result = productReview.data?.result;
  if (!result) return <>...loading</>;
  return (
    <>
      <Title>Review</Title>
      <Container>
        {result.map((review, idx) => (
          <ReviewContainer key={idx}>
            <UserProfile>
              <img src="/profile_ex.png"></img>
              <UserNameRank>
                <p id="userName">{review.memberId}</p>
                <p id="userRank">1Lv</p>
              </UserNameRank>
              <p id="createAt">{review.createdAt}</p>
            </UserProfile>
            <StarsWrapper>
              {' '}
              {Array.from({ length: review.rating }, (_, index) => (
                <FaStar key={index} className="stars" color="gold" />
              ))}
              {/* <FaStarHalf className="stars" color="gold"></FaStarHalf> */}
            </StarsWrapper>
            <Option>나이키 V2K 런 퓨어 플래티넘 라이트 아이언 오어</Option>
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
    right: 0.5rem;
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
