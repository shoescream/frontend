import { useMutation, useQuery } from '@tanstack/react-query';
import { Instance, PostInstance } from 'app/api';
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
const useProductReviews = (productNumber: number) => {
  return useQuery<Result<useAllReviewsProps[]>>({
    queryKey: ['product-reviews', productNumber],
    retry: false,
    queryFn: async () => {
      const response = await Instance.get(`/reviews/${productNumber}`);
      return response.data;
    },
  });
};

interface ReviewProps {
  reviewNumber: number;
  memberId: string;
  rating: number;
  createdAt: string;
  reviewTitle: string;
  reviewContent: string;
  reviewComments: string[];
  reviewCommentsCount: number;
  reviewImages: string[];
}

const useGetReview = (reviewNumber: number) => {
  return useQuery<Result<ReviewProps>>({
    queryKey: ['Review', reviewNumber],
    retry: false,
    queryFn: async () => {
      const response = await Instance.get('/review/' + reviewNumber);

      return response.data;
    },
  });
};

interface PostReviewProps {
  productNumber: number | undefined;
  closeModal: () => void;
}

const usePostReview = ({ productNumber, closeModal }: PostReviewProps) => {
  return useMutation({
    mutationFn: async (formdata: FormData) => {
      await PostInstance.post(`/review/post/${productNumber}`, formdata);
    },
    onSuccess: () => {
      closeModal();
      window.location.reload();
    },
    onError: (e) => {
      console.error(e);
    },
  });
};

interface MyReviewProps {
  productNumber: number;
  productSubName: string;
  productImage: string;
  productName: string;
  dealSize: string;
  dealPrice: number;
  writeDeadLine: string;
  dealNumber: number;
  isWriteReview: boolean;
}

const useGetMyReviews = () => {
  return useQuery<Result<MyReviewProps[]>>({
    queryKey: ['MyReview', 'my'],
    retry: false,
    queryFn: async () => {
      const response = await Instance.get('my/review');
      return response.data;
    },
  });
};

const useDeleteReview = () => {
  return useMutation({
    mutationFn: async (reviewNumber: number) => {
      await Instance.post(`/review/delete/${reviewNumber}`);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (e) => {
      console.error(e);
    },
  });
};

interface updateReviewProps {
  reviewTitle: string;
  reviewContent: string;
  rating: number;
}

const useUpdateReview = (reviewNumber: number) => {
  return useMutation({
    mutationFn: async (reviewData: updateReviewProps) => {
      await Instance.post(`/review/update/${reviewNumber}`, reviewData);
    },
    onSuccess: () => {
      window.location.reload();
    },
    onError: (e) => {
      console.error(e);
    },
  });
};
export {
  useProductReviews,
  usePostReview,
  useGetReview,
  useGetMyReviews,
  useDeleteReview,
  useUpdateReview,
};
