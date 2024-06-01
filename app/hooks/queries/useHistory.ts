import { useQuery } from '@tanstack/react-query';
import { Instance } from 'app/api';
import { Dayjs } from 'dayjs';

interface ProductHistory {
  myBuyResponse: [
    {
      productResponse: {
        id: number;
        productCode: string;
        productName: string;
        productSubName: string;
        brandName: string;
        price: number;
        brandImage: string;
        productImageResponse: {
          productImage: string[];
        };
        createdAt: string;
        views: number;
      };
      buyingBidResponse: {
        size: number;
        bidPrice: number;
        quantity: number;
        createdAt: string;
        buyBidDeadline: string;
        bidStatus: string;
        bidType: string;
      };
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
    queryKey: ['type', type],
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
      return response.data.result;
    },
  });
};

export { useProductHistory };
