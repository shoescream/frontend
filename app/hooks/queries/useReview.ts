import { useMutation, useQuery } from '@tanstack/react-query';
import { Instance } from 'app/api';
import { Result } from './useHistory';

interface useAllReviewsProps {
  createdAt: string;
  memberId: string;
  reviewNumber: number;
  rating: number;
  reviewTitle: string;
  reviewContent: string;
  CommentCount: number;
  reviewImages: string[];
  reviewCommentsCount: number;
}
interface productReviewsProps {
  productNumber: number;
}
const useProductReviews = (productNumber: number) => {
  return useQuery<Result<useAllReviewsProps[]>>({
    queryKey: ['product-reviews', productNumber],
    retry: false,
    queryFn: async () => {
      console.log(productNumber);
      const response = await Instance.get(`/reviews/${productNumber}`);
      console.log(response.data.result);
      return response.data;
    },
  });
};

interface ReviewProps {
  result: {
    reviewNumber: number;
    memberId: string;
    rating: number;
    createdAt: string;
    reviewTitle: string;
    reviewContent: string;
    reviewComments: string[];
    reviewImages: string[];
  };
}

const useGetReview = (reviewNumber: number) => {
  return useQuery<ReviewProps>({
    queryKey: ['Review', reviewNumber],
    retry: false,
    queryFn: async () => {
      const response = await Instance.get('/reviews/' + reviewNumber);

      return response.data;
    },
  });
};

interface ReviewPostData {
  productNumber: number;
  memberId: string;
  rating: number;
  reviewTitle: string;
  reviewContent: string;
  reviewImages: string[];
}

const usePostReview = () => {
  return useMutation({
    mutationFn: async (reviewData: ReviewPostData) => {
      await Instance.post(`/review/post/${reviewData.productNumber}`, {
        memberId: reviewData.memberId,
        rating: reviewData.rating,
        reviewTitle: reviewData.reviewTitle,
        reviewContent: reviewData.reviewContent,
        reviewImages: reviewData.reviewImages,
      });
    },
    onSuccess: () => {},
    onError: (e) => {
      console.error(e);
    },
  });
};

export { useProductReviews, usePostReview, useGetReview };
