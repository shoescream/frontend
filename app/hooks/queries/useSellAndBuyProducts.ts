import { useQuery } from '@tanstack/react-query';
import { Instance } from 'app/api';

export interface BuyProduct {
    productCode: string;
    productName: string;
    productSubName: string;
    lowestPrice: number;
    highestPrice: number;
}

const fetchBuyProducts = async (productNumber: number | string, size: string): Promise<BuyProduct> => {
    const token = localStorage.getItem('token');
    const response = await Instance.get(`/buy/${productNumber}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        params: {
            size: size,
        },
    });
    console.log('Buy Data:', response.data.result);
    return response.data.result;
};

const useBuyProducts = (productNumber: number | string, size: string) => {
    return useQuery<BuyProduct>({
        queryKey: ['products', productNumber, size],
        queryFn: () => fetchBuyProducts(productNumber, size),
    });
};

export interface SellProduct {
    productCode: string;
    productName: string;
    productSubName: string;
    lowestPrice: number;
    highestPrice: number;
}

const fetchSellProducts = async (productNumber: number | string, size: string): Promise<SellProduct> => {
    const token = localStorage.getItem('token');
    const response = await Instance.get(`/sell/${productNumber}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
        params: { size }
    });
    console.log('Sell Data:', response.data.result);
    return response.data.result;
};

const useSellProducts = (productNumber: number | string, size: string) => {
    return useQuery<SellProduct>({
        queryKey: ['products', productNumber, size],
        queryFn: () => fetchSellProducts(productNumber, size),
    });
};

export { useBuyProducts, useSellProducts };