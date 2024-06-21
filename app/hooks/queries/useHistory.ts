import { useQuery } from '@tanstack/react-query';
import { Instance, InstanceWithToken } from 'app/api';
export interface ProductHistory {
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
export interface Result<T> {
  result: T;
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
  return useQuery<Result<ProductHistory[]>>({
    queryKey: ['product-history', type, status],
    enabled: !!type,
    retry: false,
    queryFn: async () => {
      const response = await InstanceWithToken.get(
        '/my/' +
          type +
          `?status=${status}` +
          `&startDate=${startDate}` +
          `&endDate=${endDate}`
      );

      console.log(response);
      return response.data;
    },
  });
};

export { useProductHistory };
