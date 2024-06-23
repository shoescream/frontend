import { usePostReview } from '@/hooks/queries/useReview';
import theme from '@/styles/theme';
import { ReviewDetails } from 'app/(route)/my/review/page';
import { useState } from 'react';
import styled from 'styled-components';

interface reviewPostProps {
  closeModal: () => void;
  reviewDetails: ReviewDetails | null;
}

const ReviewPost = ({ closeModal, reviewDetails }: reviewPostProps) => {
  const [selectedRating, setSelectedRating] = useState(1);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [reviewText, setReviewText] = useState('');
  const handleStarClick = (rating: number) => {
    setSelectedRating(rating);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      const updateFiles = selectedFiles.concat(fileArray);
      if (updateFiles.length > 5) {
        alert('사진은 최대 5개까지 선택 가능합니다');
        return;
      }
      setSelectedFiles(updateFiles);
    }
  };

  const post = usePostReview({ productNumber: reviewDetails?.id, closeModal });

  const postReviewHandler = async () => {
    const formData = new FormData();
    const reviewData = {
      reviewTitle: reviewText,
      reviewContent: reviewText,
      rating: selectedRating,
      dealNumber: reviewDetails?.dealNumber,
    };
    formData.append(
      'reviewPostRequest',
      new Blob([JSON.stringify(reviewData)], { type: 'application/json' })
    );
    selectedFiles.forEach((file) => {
      formData.append('reviewImage', file);
    });
    post.mutate(formData);
  };
  const handleRemoveFile = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };
  return (
    <Modal>
      <ModalContent>
        <CloseButton onClick={closeModal}>&times;</CloseButton>
        <ModalHeader>
          <ModalProductImage
            src={reviewDetails?.productImage}
            alt={reviewDetails?.productImage}
          />
          <ModalProductInfo>
            <ProductName>{reviewDetails?.productName}</ProductName>
            <ProductOption>{reviewDetails?.dealPrice}</ProductOption>
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
            {selectedFiles.map((file, index) => (
              <FilePreviewContainer key={index}>
                <ImagePreview
                  src={URL.createObjectURL(file)}
                  alt={`Review Image ${index + 1}`}
                />
                <RemoveButton onClick={() => handleRemoveFile(index)}>
                  &times;
                </RemoveButton>
              </FilePreviewContainer>
            ))}
          </FilePreviewWrapper>

          <AddImageBox>
            <CustomFileInput
              type="file"
              accept="image/*"
              id="file"
              onChange={handleFileChange}
            ></CustomFileInput>
            <label htmlFor="file">사진 추가+</label>
          </AddImageBox>
        </ImagesSection>
        <ReviewPostForm>
          <Textarea
            placeholder="리뷰를 입력하세요"
            rows={20}
            cols={30}
            onChange={(e) => setReviewText(e.target.value)}
          ></Textarea>
          <SubmitButton type="button" onClick={postReviewHandler}>
            리뷰작성
          </SubmitButton>
        </ReviewPostForm>
      </ModalContent>
    </Modal>
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

const RemoveButton = styled.button`
  position: absolute;
  width: 2rem;
  height: 2rem;
  font-size: 3rem;
  border-radius: 1rem;
  top: -1.5rem;
  right: -1rem;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0);
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

const AddImageBox = styled.div`
  width: 10rem;
  height: 10rem;
  background-color: ${theme.colors.gray[100]};
  border: 0.1rem dashed ${theme.colors.gray[200]};
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    width: 100%;
    height: 100%;
    cursor: pointer;
    text-align: center;
    padding-top: 40%;
    color: ${theme.colors.gray[300]};
  }
`;

const CustomFileInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  padding: 0;
  overflow: hidden;
  border: 0;
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

export default ReviewPost;
