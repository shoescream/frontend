import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import { useRouter } from 'next/navigation';

interface RankingProps {
    productImage: string;
    brandName: string;
    productName: string;
    productCode: string;
    price: string;
}


const ItemBoxWithoutLike: React.FC<RankingProps> = ({ productImage, brandName, productName, productCode, price }) => {
    const router = useRouter();

    const handleClick = () => {
        router.push(`/product/${productCode}`);
    };

    return (
        <ImageItemContainer onClick={handleClick}>
            <ItemBox>
                <Image referrerPolicy="no-referrer" src={productImage} alt={productName} />
                <Brand className='brand'>{brandName}</Brand>
                <ProductName className='product-name'>{productName}</ProductName>
                <Price className='price' style={{ marginTop: '2rem' }}>{price}</Price>
            </ItemBox>
        </ImageItemContainer>
    );
};

export default ItemBoxWithoutLike;

const ImageItemContainer = styled.div`
    width: calc(20% - 1rem);
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 5rem;
`;

const ItemBox = styled.div`
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
