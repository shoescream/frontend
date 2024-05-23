import { useQuery } from '@tanstack/react-query';
import { Instance } from 'app/api';

interface DetailProduct {
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
  productOptionResponse: {
    sizeAndPriceBuyInfo: {
      [key: string]: number;
    };
    sizeAndPriceSellInfo: {
      [key: string]: number;
    };
    maxSellInfo: number;
    minBuyInfo: number;
  };
  dealResponse: {
    size: string;
    price: number;
    tradedAt: string;
  }[];
  sellingBidResponse: {
    productCode: string;
    size: string;
    price: number;
    quantity: number;
  }[];
  buyingBidResponse: {
    productCode: string;
    size: string;
    price: number;
    quantity: number;
  }[];
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
