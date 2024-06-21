import {
  useGetReview,
  usePostReview,
  useUpdateReview,
} from '@/hooks/queries/useReview';
import theme from '@/styles/theme';
import { ReviewDetails } from 'app/(route)/my/review/page';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface reviewPostProps {
  closeModal: () => void;
  reviewNumber: number;
  productImage?: string[];
  productName?: string;
}

const UpdateReview = ({
  closeModal,
  reviewNumber,
  productImage,
  productName,
}: reviewPostProps) => {
  const [selectedRating, setSelectedRating] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [reviewText, setReviewText] = useState('');
  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };
  const update = useUpdateReview(reviewNumber);
  const response = useGetReview(reviewNumber).data?.result;

  const updateReviewHandler = async () => {
    const reviewData = {
      reviewTitle: reviewText,
      reviewContent: reviewText,
      rating: selectedRating,
    };
    update.mutate(reviewData);
    closeModal();
  };

  useEffect(() => {
    if (response) {
      setSelectedRating(response.rating);
      setReviewText(response.reviewContent);
      setSelectedFiles(response.reviewImages);
    }
  }, [response]);
  return (
    response && (
      <Modal>
        <ModalContent>
          <CloseButton onClick={closeModal}>&times;</CloseButton>
          <ModalHeader>
            <ModalProductImage
              src={productImage ? productImage[0] : ''}
              alt={productImage ? productImage[0] : ''}
            />
            <ModalProductInfo>
              <ProductName>{productName}</ProductName>
              {/* <ProductOption>{reviewDetails?.dealPrice}</ProductOption> */}
            </ModalProductInfo>
          </ModalHeader>
          <RatingSection>
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                selected={selectedRating >= star}
                onClick={() => handleStarClick(star)}
              >
                ★
              </Star>
            ))}
          </RatingSection>
          <ImagesSection>
            <FilePreviewWrapper>
              {response.reviewImages.map((url, index) => (
                <FilePreviewContainer key={index}>
                  <ImagePreview src={url} alt={`Review Image ${index + 1}`} />
                </FilePreviewContainer>
              ))}
            </FilePreviewWrapper>
          </ImagesSection>
          <ReviewPostForm>
            <Textarea
              placeholder="리뷰를 입력하세요"
              rows={20}
              cols={30}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            ></Textarea>
            <SubmitButton type="button" onClick={updateReviewHandler}>
              리뷰작성
            </SubmitButton>
          </ReviewPostForm>
        </ModalContent>
      </Modal>
    )
  );
};

const FilePreviewWrapper = styled.div`
  width: 50rem;
  display: flex;
  overflow-x: scroll;
`;

const FilePreviewContainer = styled.div`
  position: relative;
  margin-right: 1rem;
`;

const ProductName = styled.div`
  font-size: ${theme.fontSize.body1};
  font-weight: bold;
  margin-bottom: 0.5rem;
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

const ProductOption = styled.div`
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

const Star = styled.span<{ selected: boolean }>`
  font-size: 5rem;
  color: ${(props) => (props.selected ? '#ff6f61' : '#d3d3d3')};
  cursor: pointer;
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

const ReviewPostForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Textarea = styled.textarea`
  padding: 1rem;
  border: 0.1rem solid ${theme.colors.gray[100]};
  border-radius: 0.5rem;
  margin-bottom: 1rem;
  resize: none;
`;

const SubmitButton = styled.button`
  height: 5rem;
  background-color: #3b3b3b;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

export default UpdateReview;
