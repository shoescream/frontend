import { useQuery } from '@tanstack/react-query';
import { Instance } from 'app/api';

export interface BuyProduct {
    productCode: string;
    productName: string;
    productSubName: string;
    lowestPrice: number;
    highestPrice: number;
}

const fetchProducts = async (productNumber: number | string): Promise<BuyProduct[]> => {
    const token = localStorage.getItem('token');
    const response = await Instance.get(`/buy/${productNumber}`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    console.log("Buy Data: ", response.data.result);
    return response.data.result;
};

const useBuyProducts = (productNumber: number | string) => {
    return useQuery<BuyProduct[]>({
        queryKey: ['products', productNumber],
        queryFn: () => fetchProducts(productNumber),
    });
};

export { useBuyProducts };
