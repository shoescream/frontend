import { useQuery } from '@tanstack/react-query';
import { Instance } from 'app/api';

interface DetailProduct {
  productResponse: {
    id: number;
    productCode: string;
    productName: string;
    productSubName: string;
    brandName: string;
    productImageResponse: {
      productImage: string[];
    };
    createdAt: string;
    views: number;
  };
  productOptionResponse: {
    size: string;
  };
}

const useDetailProduct = (productNumber: string) => {
  return useQuery<DetailProduct>({
    queryKey: ['detail-product', productNumber],
    enabled: !!productNumber,
    retry: false,
    queryFn: async () => {
      const response = await Instance.get('/products/' + productNumber);

      return response.data.result;
    },
  });
};

export { useDetailProduct };
