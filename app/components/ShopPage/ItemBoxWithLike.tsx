// ItemBoxWithLike.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { ShopProductType } from 'app/(route)/shop/shopProduct';

interface ItemBoxWithLikeProps {
    product: ShopProductType; // ProductType에 해당하는 속성
}

const numberToPriceString = (price: number): string => {
    return price.toLocaleString('ko-KR') + '원';
};

const ItemBoxWithLike: React.FC<ItemBoxWithLikeProps> = ({ product }) => {
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleLikeClick = () => {
        setLiked(!liked);
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1)); // 좋아요 개수 증감
    };

    return (
        <ImageItemContainer>
            <ItemBoxWrapper>
                <Image referrerPolicy="no-referrer" src={product.productImageResponse.productImage[0]} alt={product.productName}></Image>
                <Text className='brand' style={{ fontWeight: 'bold' }}>{product.brandName}</Text>
                <Text className='product-name'>{product.productSubName}</Text>
                <Text className='price' style={{ fontWeight: 'bold', marginTop: '2rem' }}>{numberToPriceString(product.price)}</Text>
                <LikeArea>
                    <LikeButton onClick={handleLikeClick}>{liked ? '🖤' : '🤍'}</LikeButton>
                    <LikeCount>{likeCount}</LikeCount>
                </LikeArea>
            </ItemBoxWrapper>
        </ImageItemContainer>
    );
};

export default ItemBoxWithLike;

// 좋아요 아이콘
const LikeButton = styled.button`
    margin-left: 0.3rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
`;

// 좋아요 수 표시
const LikeCount = styled.span`
    margin-left: 0.5rem;
`;

// 이미지 아이템 컨테이너
const ImageItemContainer = styled.div`
    width: calc(25% - 1rem); 
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 2rem; 
    margin-right: 1rem;
`;

// 이미지 아이템 박스
const ItemBoxWrapper = styled.div`
    position: relative;
    overflow: hidden;
    background-color: white;
`;

// 이미지 스타일
const Image = styled.img`
    border-radius: 1rem;
    margin-bottom: 1rem;
    background-color: ${theme.colors.gray[100]}; 
    width: 100%; 
    height: auto;
`;

// 브랜드명, 상품명, 가격 스타일
const Text = styled.div`
    margin: 0.5rem;
`;

// 좋아요 영역 스타일
const LikeArea = styled.div`
    display: flex;
    margin-top: 1rem;
    margin-bottom: 3rem;
`;
