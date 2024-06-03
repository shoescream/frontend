import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface RankingProps {
    productImage: string;
    branName: string;
    productName: string;
    price: string;
}

const ItemBoxWithoutLike: React.FC<RankingProps> = ({ productImage, branName, productName, price }) => {
    return (
        <ImageItemContainer>
            <ItemBox>
                <Image referrerPolicy="no-referrer" src={productImage} alt={productName}></Image>
                <Brand className='brand'>{branName}</Brand>
                <ProductName className='product-name'>{productName}</ProductName>
                {/* <Price className='price' style={{ marginTop: '2rem' }}>{price}</Price> */}
            </ItemBox>
        </ImageItemContainer>
    );
};

export default ItemBoxWithoutLike;

const ImageItemContainer = styled.div`
    width: calc(20% - 1rem);
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 3rem;
`;

const ItemBox = styled.div`
    position: relative;
    overflow: hidden;
    background-color: white;
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
`;

const Price = styled.p`
    margin: 0.5rem;
    margin-bottom: 3rem;
`;
