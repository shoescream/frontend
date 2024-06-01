import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export interface RankingProduct {
    id: number;
    productNumber: string;
    productCode: string;
    brandName: string;
    productName: string;
    price: string;
    productImageResponse: {
        productImage: string[];
    };
    productImage: string;
}

const fetchRankingData = async (): Promise<RankingProduct[][]> => {
    const rankingParamsArray = [
        { gender: 'M', detail: 'SNK', productType: '01' },
        { gender: 'F', detail: 'SNK', productType: '01' },
        { gender: 'M', detail: 'SND', productType: '01' }
    ];

    const responseArray = await Promise.all(rankingParamsArray.map(params => axios.get('http://3.35.24.20:8080/ranking', { params })));
    return responseArray.map(response => response.data.result);
};

const useRankingProducts = () => {
    return useQuery<RankingProduct[][]>({
        queryKey: ['rankingData'],
        queryFn: fetchRankingData,
    });
};

export default useRankingProducts;
