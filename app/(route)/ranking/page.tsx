'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const RankingPage = () => {
    const [additionalImagesCounts, setAdditionalImagesCounts] = useState([5, 5, 5]);
    const [buttonClicked, setButtonClicked] = useState([false, false, false]);

    const handleShowMoreImages = (index: number) => {
        setButtonClicked((prev) => prev.map((value, i) => (i === index ? true : value))); // 더보기 클릭 시 버튼 색 변환
        setAdditionalImagesCounts((prev) => prev.map((value, i) => (i === index ? value + 5 : value))); // 더보기 클릭 시 5개씩 추가 출력
        setTimeout(() => {
            setButtonClicked((prev) => prev.map((value, i) => (i === index ? false : value)));
        }, 100);
    };

    const buttonLabels = ["남성 신발 인기 순위", "여성 신발 인기 순위", "샌들 인기 순위"];

    return (
        <div>
            {buttonLabels.map((label, index) => (
                <div key={index}>
                    <h3 style={{ margin: '30px 0 5px 0' }}>{label}</h3>
                    <p style={{ marginBottom: 20, color: 'gray' }}>조회, 관심, 거래 급상승(최근 3일)</p>
                    <ImageContainer>
                        {[...Array(additionalImagesCounts[index])].map((_, i) => (
                            <ImageItem key={i}>
                                <div className="item-box">
                                    <div className="img"></div> {/* 이미지 들어갈 공간 */} 
                                    <strong className="brand">브랜드명</strong>
                                    <p className="product-name">상품명</p>
                                    <p className="price" style={{marginTop: 20}}>가격</p>
                                </div>
                            </ImageItem>
                        ))}
                    </ImageContainer>
                    <Button clicked={buttonClicked[index]} onClick={() => handleShowMoreImages(index)}>더보기</Button>
                </div>
            ))}
        </div>
    );
};


export default RankingPage;

const ImageContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    flex-direction: row;
    align-items: flex-start;
    justify-content: space-between;
`;

const ImageItem = styled.div`
    width: calc(20% - 10px);
    border-radius: 10px;
    overflow: hidden;

    .item-box {
        position: relative;
        overflow: hidden;
        background-color: white;
    }

    .img {
        border-radius: 10px;
        width: 200;
        height: 0;
        margin-bottom: 10px;
        padding-top: 100%;
        background-color: whitesmoke; 
    }

    .brand,
    .product-name,
    .price {
        margin: 5px;
    }
    .price {
        margin-bottom: 30px;
    }
`;

const Button = styled.button<{ clicked?: boolean }>`
    display: block;
    margin: 20px auto;
    background-color: ${({ clicked }) => (clicked ? 'whitesmoke' : 'white')};
    border: 1px solid lightgray;
    padding: 12px 16px;
    border-radius: 10px;
    font-size: 12px;
    width: 100px;
    cursor: pointer;
    color: gray; 

    &:active {
        background-color: whitesmoke; 
    }
`;
