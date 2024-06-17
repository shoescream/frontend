import { useQuery } from '@tanstack/react-query';
import { Instance, InstanceWithToken } from 'app/api';
import LocalStorage from '@/utils/localStorage';

export interface SellAndBuyProduct {
  productImage: string;
  productCode: string;
  productName: string;
  productSubName: string;
  lowestPrice: number;
  highestPrice: number;
}

const useBuyProducts = (productNumber: string, size: string) => {
  return useQuery<SellAndBuyProduct>({
    queryKey: ['products', productNumber, size],
    queryFn: async () => {
      const response = await InstanceWithToken.get(`/buy/${productNumber}`, {
        params: { size },
      });
      return response.data.result;
    },
  });
};

const useSellProducts = (productNumber: string, size: string) => {
  return useQuery<SellAndBuyProduct>({
    queryKey: ['products', productNumber, size],
    queryFn: async () => {
      const response = await InstanceWithToken.get(`/sell/${productNumber}`, {
        params: { size },
      });
      return response.data.result;
    },
  });
};

export { useBuyProducts, useSellProducts };
