import { useQuery } from '@tanstack/react-query';
import { Instance } from 'app/api';

export interface ProductHistory {
  result: [
    {
      productName: string;
      productImage: string;
      price: number;
      size: number;
      createdAt: string;
      deadLine: null;
      tradedAt: string;
      type: string;
      status: string;
    }
  ];
}

interface ProductHistoryProps {
  type: string;
  status: 'bidding' | 'pending' | 'finished';
  startDate: string;
  endDate: string;
}

const useProductHistory = ({
  type,
  status,
  startDate,
  endDate,
}: ProductHistoryProps) => {
  return useQuery<ProductHistory>({
    queryKey: ['type', type, status],
    enabled: !!type,
    retry: false,
    queryFn: async () => {
      const response = await Instance.get(
        '/my/' +
          type +
          `?status=${status}` +
          `&startDate=${startDate}` +
          `&endDate=${endDate}`
      );
      return response.data;
    },
  });
};

export { useProductHistory };
