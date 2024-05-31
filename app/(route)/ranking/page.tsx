'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import ItemBoxWithoutLike from '@/components/ShopPage/ItemBox';
import useAddComma from '@/hooks/useAddComma';
import useRankingProducts from '@/hooks/queries/useRankingProducts';

const RankingPage = () => {
    const [additionalImagesCounts, setAdditionalImagesCounts] = useState([5, 5, 5]);
    const addComma = useAddComma();

    const { data: rankingData = [] } = useRankingProducts();

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
                                price={addComma(parseInt(item.price)) + '원'}
                                productImage={item.productImageResponse.productImage[0]} id={0} productImageResponse={{
                                    productImage: []
                                }}                            />
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
