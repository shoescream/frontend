import { Response } from '@/types/Response';
import LocalStorage from '@/utils/localStorage';
import { useMutation } from '@tanstack/react-query';
import { Instance } from 'app/api';

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
      console.log(data);
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

export { usePayment };
