import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { useRouter } from 'next/navigation';
import { RankingProduct } from '@/hooks/queries/useRankingProducts';
import { ShopProductType } from 'app/(route)/shop/shopProduct';

interface ItemBoxWithLikeProps {
    product?: ShopProductType;
}

const ItemBox: React.FC<RankingProduct & ItemBoxWithLikeProps> = ({
    productImageResponse,
    productImage,
    brandName,
    productName,
    productCode,
    price,
    product,
}) => {
    const router = useRouter();
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleClick = () => {
        router.push(`/product/${productCode}`);
    };

    const handleLikeClick = () => {
        setLiked(!liked);
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1)); // 좋아요 개수 증감
    };

    return (
        <ImageItemContainer onClick={handleClick}>
            <ItemBoxWrapper>
                <Image referrerPolicy="no-referrer" src={product ? product.productImageResponse.productImage[0] : productImageResponse.productImage[0]} alt={product ? product.productName : productName} />
                <Brand className='brand'>{brandName}</Brand>
                <ProductName className='product-name'>{product ? product.productName : productName}</ProductName>
                <Price className='price' style={{ marginTop: '2rem' }}>{product ? price : price}</Price>
                {product ? (
                    <LikeArea>
                        <LikeButton onClick={handleLikeClick}>{liked ? '🖤' : '🤍'}</LikeButton>
                        <LikeCount>{likeCount}</LikeCount>
                    </LikeArea>
                ) : null}
            </ItemBoxWrapper>
        </ImageItemContainer>
    );
};

export default ItemBox;

const ImageItemContainer = styled.div`
    width: calc(20% - 1rem);
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 5rem;
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
