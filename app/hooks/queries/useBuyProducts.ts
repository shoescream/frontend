import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Instance } from 'app/api';

export interface BuyProduct {
    productCode: string;
    productName: string;
    productSubName: string;
    lowestPrice: number;
    highestPrice: number;
    // productImageResponse: {
    //     productImage: string[];
    // };
}

const fetchProducts = async (productNumber: number): Promise<BuyProduct[]> => {
    const response = await axios.get(`https://shoescream.shop/buy/${productNumber}`);
    return response.data.result;
};

const useBuyProducts = (productNumber: number) => {
    return useQuery<BuyProduct[]>({
        queryKey: ['products', productNumber],
        queryFn: () => fetchProducts(productNumber),
    });
};

export { useBuyProducts };