import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface ShopProductType {  
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
    const response = await axios.get('http://3.35.24.20:8080/products');
    return response.data.result;
};

const useShopProducts = () => {
    return useQuery<ShopProductType[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
};

export { useShopProducts };
