'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';

const RankingPage = () => {
    const [additionalImagesCounts, setAdditionalImagesCounts] = useState([5, 5, 5]);

    const handleShowMoreImages = (index: number) => {
        setAdditionalImagesCounts((prev) => prev.map((value, i) => (i === index ? value + 5 : value))); // 더보기 클릭 시 5개씩 추가 출력
    };

    const buttonLabels = ["남성 신발 인기 순위", "여성 신발 인기 순위", "샌들 인기 순위"];

    return (
        <div>
            {buttonLabels.map((label, index) => (
                <div key={index}>
                    <h3 style={{ margin: '3rem 0 0.5rem 0' }}>{label}</h3>
                    <p style={{ marginBottom: 20, color: 'gray' }}>조회, 관심, 거래 급상승(최근 3일)</p>
                    <ImageContainer>
                        {[...Array(additionalImagesCounts[index])].map((_, i) => (
                            <ImageItem key={i}>
                                <div className="item-box">
                                    <div className="img"></div> {/* 이미지 들어갈 공간 */}
                                    <strong className="brand">브랜드명</strong>
                                    <p className="product-name">상품명</p>
                                    <p className="price" style={{ marginTop: 20 }}>가격</p>
                                </div>
                            </ImageItem>
                        ))}
                    </ImageContainer>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 30 }}>
                        <Button type="button" buttonColor="light" size="medium" onClick={() => handleShowMoreImages(index)}>더보기</Button>
                    </div>
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

const ImageItem = styled.div`
    width: calc(20% - 1rem);
    border-radius: 1rem;
    overflow: hidden;

    .item-box {
        position: relative;
        overflow: hidden;
        background-color: white;
    }

    .img {
        border-radius: 1rem;
        width: 200;
        height: 0;
        margin-bottom: 1rem;
        padding-top: 100%;
        background-color: whitesmoke; 
    }

    .brand,
    .product-name,
    .price {
        margin: 0.5rem;
    }
    .price {
        margin-bottom: 3rem;
    }
`;
