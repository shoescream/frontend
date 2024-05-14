'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import ItemBoxWithoutLike from '@/components/ShopPage/ItemBoxWithoutLike';

const RankingPage = () => {
    const [additionalImagesCounts, setAdditionalImagesCounts] = useState([5, 5, 5]);

    const handleShowMoreImages = (index: number) => {
        setAdditionalImagesCounts((prev) => prev.map((value, i) => (i === index ? value + 5 : value))); // 더보기 클릭 시 5개씩 추가 출력
    };

    const buttonLabels = ['남성 스니커즈 인기 순위', '여성 스니커즈 인기 순위', '남성 샌들 인기 순위'];

    return (
        <div>
            {buttonLabels.map((label, index) => (
                <div key={index}>
                    <h3 style={{ margin: '3rem 0 0.5rem 0' }}>{label}</h3>
                    <p style={{ marginBottom: '2rem', color: 'gray' }}>조회, 관심, 거래 급상승(최근 3일)</p>
                    <ImageContainer>
                        {[...Array(additionalImagesCounts[index])].map((_, i) => (
                            <ItemBoxWithoutLike key={i} />
                        ))}
                    </ImageContainer>
                    {additionalImagesCounts[index] < 30 && ( // 아이템이 30개 미만인 경우에만 더보기 버튼 표시
                        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem' }}>
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
`;
