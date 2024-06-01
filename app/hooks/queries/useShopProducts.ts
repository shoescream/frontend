import { useQuery } from '@tanstack/react-query';
import { Instance } from 'app/api';

export interface ShopProductType {
    productNumber: string;  
    id: number;
    brandName: string;
    productCode: string;
    productName: string;
    productSubName: string;
    price: number;
    productImageResponse: {
        productImage: string[];
    };
}

const fetchProducts = async (): Promise<ShopProductType[]> => {
    const response = await Instance.get('/products');
    return response.data.result;
};

const useShopProducts = () => {
    return useQuery<ShopProductType[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
};

export { useShopProducts };
