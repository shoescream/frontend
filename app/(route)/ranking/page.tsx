'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import ItemBoxWithoutLike from '@/components/ShopPage/ItemBoxWithoutLike';
import axios from 'axios';
import useAddComma from '@/hooks/useAddComma';
import { useQuery } from '@tanstack/react-query';

// RankingProduct 타입 정의
interface RankingProduct {
    id: number;
    productCode: string;
    brandName: string;
    productName: string;
    price: string;
    productImageResponse: {
        productImage: string[];
    };
}

// fetchRankingData 함수 정의
const fetchRankingData = async () => {
    const rankingParamsArray = [
        { gender: 'M', detail: 'SNK', productType: '01' },
        { gender: 'F', detail: 'SNK', productType: '01' },
        { gender: 'M', detail: 'SND', productType: '01' }
    ];

    const responseArray = await Promise.all(rankingParamsArray.map(params => axios.get('http://3.35.24.20:8080/ranking', { params })));
    return responseArray.map(response => response.data.result);
};

const RankingPage = () => {
    const [additionalImagesCounts, setAdditionalImagesCounts] = useState([5, 5, 5]);
    const addComma = useAddComma();

    const { data: rankingData = [] } = useQuery<RankingProduct[][]>({
        queryKey: ['rankingData'],
        queryFn: fetchRankingData,
    });

    const handleShowMoreImages = (index: number) => {
        setAdditionalImagesCounts(prev => prev.map((value, i) => (i === index ? value + 5 : value)));
    };

    return (
        <div>
            {rankingData.map((categoryData, index) => (
                <div key={index}>
                    <h3 style={{ margin: '3rem 0 0.5rem 0' }}>
                        {index === 0 ? '남성 스니커즈 인기 순위' : index === 1 ? '여성 스니커즈 인기 순위' : '남성 샌들 인기 순위'}
                    </h3>
                    <p style={{ marginBottom: '3rem', color: 'gray' }}>조회, 관심, 거래 급상승(최근 3일)</p>
                    <ImageContainer>
                        {categoryData.slice(0, additionalImagesCounts[index]).map((item, i) => (
                            <ItemBoxWithoutLike
                                key={i}
                                brandName={item.brandName}
                                productName={item.productName}
                                productCode={item.productCode}
                                price={addComma(parseInt(item.price))}
                                productImage={item.productImageResponse.productImage[0]}
                            />
                        ))}
                    </ImageContainer>
                    {additionalImagesCounts[index] < 30 && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5rem' }}>
                            <Button type='button' buttonColor='light' size='medium' onClick={() => handleShowMoreImages(index)}>더보기</Button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RankingPage;

const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 3rem;
`;
