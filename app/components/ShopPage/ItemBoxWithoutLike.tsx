// ranking에 import되는 컴포넌트

import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

const ItemBoxWithoutLike = () => {
    return (
        <ImageItemContainer>
            <ItemBox>
                <Image></Image> {/* 이미지 들어갈 공간 */}
                <Brand className='brand'>브랜드명</Brand>
                <ProductName className='product-name'>상품명</ProductName>
                <Price className='price' style={{ marginTop: '2rem' }}>가격</Price>
            </ItemBox>
        </ImageItemContainer>
    );
};

export default ItemBoxWithoutLike;

const ImageItemContainer = styled.div`
    width: calc(20% - 1rem);
    border-radius: 1rem;
    overflow: hidden;
`;

const ItemBox = styled.div`
    position: relative;
    overflow: hidden;
    background-color: white;
`;

const Image = styled.div`
    border-radius: 1rem;
    height: 0;
    margin-bottom: 1rem;
    padding-top: 100%;
    background-color: ${theme.colors.gray[100]}; 
`;

const Brand = styled.strong`
    margin: 0.5rem;
    font-weight: bold;
`;

const ProductName = styled.p`
    margin: 0.5rem;
`;

const Price = styled.p`
    margin: 0.5rem;
    margin-bottom: 3rem;
`;
