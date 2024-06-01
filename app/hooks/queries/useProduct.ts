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
    }[];
    sizeAndPriceSellInfo: {
      [key: string]: number;
    }[];
    maxSellInfo: number;
    minBuyInfo: number;
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

export interface ProductTransactionsItem {
  size: string;
  price: number;
  tradedAt: string;
}

interface ProductTransactions {
  dealResponse: ProductTransactionsItem[];
}

const useGetTransactions = ({
  productNumber,
  size,
}: {
  productNumber: string;
  size: string;
}) => {
  return useQuery<ProductTransactions>({
    queryKey: ['transactions', productNumber, size],
    enabled: !!productNumber && !!size,
    retry: false,
    queryFn: async () => {
      const response = await Instance.get('/deal-history', {
        params: {
          productNumber,
          size,
        },
      });

      return response.data.result;
    },
  });
};

export interface ProductBidsItem {
  createdAt: string;
  size: string;
  price: number;
  quantity: number;
}

interface ProductBids {
  sellingBidResponse: ProductBidsItem[];
  buyingBidResponse: ProductBidsItem[];
}

const useGetBid = ({
  productNumber,
  size,
}: {
  productNumber: string;
  size: string;
}) => {
  return useQuery<ProductBids>({
    queryKey: ['bids', productNumber, size],
    enabled: !!productNumber && !!size,
    retry: false,
    queryFn: async () => {
      const response = await Instance.get('/bid-history', {
        params: {
          productNumber,
          size,
        },
      });

      return response.data.result;
    },
  });
};

interface ProductQuotes {
  [key: string]: number;
}

const useGetQuote = ({
  productNumber,
  size,
  period,
}: {
  productNumber: string;
  size: string;
  period: number;
}) => {
  return useQuery<ProductQuotes>({
    queryKey: ['quote', productNumber, size, period],
    enabled: !!productNumber && !!size && !!period,
    retry: false,
    queryFn: async () => {
      const response = await Instance.get('/quote', {
        params: {
          productNumber,
          size,
          period,
        },
      });

      return response.data.result.quote;
    },
  });
};

export { useDetailProduct, useGetTransactions, useGetBid, useGetQuote };
