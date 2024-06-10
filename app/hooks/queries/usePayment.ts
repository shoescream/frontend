import { Response } from '@/types/Response';
import LocalStorage from '@/utils/localStorage';
import { useMutation } from '@tanstack/react-query';
import { Instance } from 'app/api';
import { useRouter } from 'next/navigation';

interface PaymentResponse {
  tid: string;
  next_redirect_pc_url: string;
  created_At: string;
}

interface PaymentProps {
  item_name: string;
  total_amount: number;
}

const usePayment = () => {
  return useMutation({
    mutationFn: async ({ item_name, total_amount }: PaymentProps) => {
      const response: { data: PaymentResponse } = await Instance.post(
        '/payment/ready',
        {
          item_name,
          quantity: 1,
          total_amount,
        },
        {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem('@token')}`,
          },
          withCredentials: true,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.next_redirect_pc_url) {
        window.location.href = data.next_redirect_pc_url;
      }
    },
    onError: (error) => {
      console.error('usePayment: ', error);
      throw error;
    },
  });
};

interface SellingResponse {
  size: string;
  price: number;
  quantity: number;
  createdAt: string;
}

interface SellNowProps {
  productNumber: number;
  size: string;
  price: number;
}

const useSellNow = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ productNumber, size, price }: SellNowProps) => {
      const response: { data: Response<SellingResponse> } = await Instance.post(
        '/sell-now',
        {
          productNumber,
          size,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${LocalStorage.getItem('@token')}`,
          },
          withCredentials: true,
        }
      );

      return response;
    },
    onSuccess: (data) => {
      if (data.data.resultCode === 'SUCCESS') {
        console.log(data);
        window.location.href = '/my/history/selling';
        router.push('/my/history/selling');
      }
    },
    onError: (error) => {
      console.error('useSellNow: ', error);
      throw error;
    },
  });
};

export { usePayment, useSellNow };
