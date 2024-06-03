'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { useRouter } from 'next/navigation';
import { RankingProduct } from '@/hooks/queries/useRankingProducts';
import { ShopProductType } from '@/hooks/queries/useShopProducts';

interface ItemBoxProps {
    product: RankingProduct | ShopProductType;
    showLikeButton?: boolean;
    pageType: 'ranking' | 'shop';
}

const ItemBox: React.FC<ItemBoxProps> = ({ product, showLikeButton = false, pageType }) => {
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleClick = () => {
        router.push(`/product/${product.productNumber}`);
    };

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        setLiked(!liked);
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1));
    };

    return (
        <ImageItemContainer className={pageType} onClick={handleClick}>
            <ItemBoxWrapper>
                <Image
                    referrerPolicy="no-referrer"
                    src={product.productImageResponse.productImage[0]}
                    alt={product.productName}
                />
                <Brand>{product.brandName}</Brand>
                <ProductName>{product.productName}</ProductName>
                <Price>{product.price}</Price>
                {showLikeButton && (
                    <LikeArea>
                        <LikeButton onClick={handleLikeClick}>{liked ? '🖤' : '🤍'}</LikeButton>
                        <LikeCount>{likeCount}</LikeCount>
                    </LikeArea>
                )}
            </ItemBoxWrapper>
        </ImageItemContainer>
    );
};

export default ItemBox;

const ImageItemContainer = styled.div`
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 5rem;
    
    &.ranking {
        width: calc(20% - 1rem);
    }

    &.shop {
        width: calc(25% - 1rem);
        margin-right: 1rem;
    }
`;

const ItemBoxWrapper = styled.div`
    position: relative;
    overflow: hidden;
    background-color: white;
    cursor: pointer;
`;

const Image = styled.img`
    border-radius: 1rem;
    margin-bottom: 1rem;
    background-color: ${theme.colors.gray[100]};
    width: 100%;
    height: auto;
`;

const Brand = styled.h4`
    margin: 0.5rem;
    font-weight: bold;
`;

const ProductName = styled.p`
    margin: 0.5rem;
    margin-bottom: 3rem;
`;

const Price = styled.strong`
    margin: 0.5rem;
    margin-bottom: 3rem;
`;

const LikeButton = styled.button`
    margin-left: 0.3rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
`;

const LikeCount = styled.span`
    margin-left: 0.5rem;
`;

const LikeArea = styled.div`
    display: flex;
    margin-top: 1rem;
    margin-bottom: 3rem;
`;
