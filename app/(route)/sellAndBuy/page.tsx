'use client';

import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import axios from 'axios';

interface Product {
    productResponse: {
        productImageResponse: {
            productImage: string[];
        };
        productName: string;
        productSubName: string;
        size: string;
        sizeAndPriceBuyInfo: string;
        sizeAndPriceSellInfo: string;
        id: string;
        brandImage: string;
    };

}

// const fetchProducts = async (): Promise<Product[]> => {
//     const response = await axios.get('http://3.35.24.20:8080/products/{productId}');
//     return response.data.result;
// };

// const fetchProducts = async (): Promise<Product[]> => {
//     try {
//         const response = await axios.get('http://3.35.24.20:8080/products/${productId}');
//         console.log('서버 응답:', response.data.result); 
//         return response.data.result;
//     } catch (error) {
//         console.error('서버 응답 오류:', error);
//         return []; 
//     }
// };

const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get('http://3.35.24.20:8080/products');
        const products = response.data.result;

        // 각 상품 정보 배열에 담기
        const productPromises = products.map(async (product: Product) => {
            const productResponse = await axios.get(`http://3.35.24.20:8080/products/${product.productResponse.id}`);
            const productInfo = productResponse.data.result;
            console.log('상품 정보:', productInfo);
            return productInfo;
        });

        return Promise.all(productPromises);
    } catch (error) {
        console.error('서버 응답 오류:', error);
        return [];
    }
};

const SellAndBuyPage = () => {
    const [view, setView] = useState('buy'); // 기본 화면을 'buy'로 설정

    const { data } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: fetchProducts,
    });
    const product = data ? data[0] : null;
    if (!product) return <div>No product available</div>;

    return (
        <MainContainer>
            <SellAndBuyContainer>
                <TopSection>
                    <Image referrerPolicy="no-referrer" src={product.productResponse.productImageResponse.productImage[0]} alt={product.productResponse.productName}></Image>
                    <ProductInfo>
                        <EngProductName>{product.productResponse.productName}</EngProductName>
                        <KorProductName>{product.productResponse.productSubName}</KorProductName>
                        <Size></Size>
                    </ProductInfo>
                </TopSection>
                <Separator />
                <PriceInfo>
                    <PriceContainer>
                        <PriceLabel>즉시 구매가</PriceLabel>
                        <Price>{product.productResponse.sizeAndPriceBuyInfo}</Price>
                    </PriceContainer>
                    <PriceSeparator />
                    <PriceContainer>
                        <PriceLabel>즉시 판매가</PriceLabel>
                        <Price>{product.productResponse.sizeAndPriceSellInfo}</Price>
                    </PriceContainer>
                </PriceInfo>
                <BottomSection>
                    <ButtonContainer>
                        <Button
                            type='button'
                            buttonColor='light'
                            size='xlarge'
                            color='selling'
                            onClick={() => setView('bid')}
                        >
                            구매 입찰
                        </Button>
                        <Button
                            type='button'
                            buttonColor='light'
                            size='xlarge'
                            color='buying'
                            onClick={() => setView('buy')}
                        >
                            즉시 구매
                        </Button>
                    </ButtonContainer>
                    {view === 'buy' && (
                        <BuySection>
                            <p>즉시 구매를 선택하셨습니다.</p>
                            <Button type='button' buttonColor='dark' size='full'>즉시 구매 계속</Button>
                        </BuySection>
                    )}
                    {view === 'bid' && (
                        <BidSection>
                            <p>구매 입찰을 선택하셨습니다.</p>
                            <Button type='button' buttonColor='dark' size='full'>구매 입찰 계속</Button>
                        </BidSection>
                    )}
                </BottomSection>
            </SellAndBuyContainer>
        </MainContainer>
    );
};

export default SellAndBuyPage;

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.gray[100]};
`;

const SellAndBuyContainer = styled.div`
    background-color: white;
    width: 50%;
    margin-top: 2rem;
    margin-bottom: 10rem;
    padding: 3rem;
`;

const TopSection = styled.div`
    display: flex;
    margin-bottom: 3rem;
`;

const Image = styled.img`
    width: 8rem;
    height: 8rem;
    margin-right: 2rem;
    border-radius: 1rem;
`;

const ProductInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const EngProductName = styled.div`
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
`;

const KorProductName = styled.div`
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
    color: gray;
`;

const Size = styled.div`
    font-size: 1.5rem;
    font-weight: bold;
`;

const Separator = styled.div`
    width: 100%;
    height: 0.1rem;
    background-color: ${theme.colors.gray[100]};
    margin-bottom: 2rem;
`;

const PriceInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PriceContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
`;

const PriceLabel = styled.div`
    font-size: 1rem;
    color: gray;
    margin-bottom: 0.5rem;
`;

const Price = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
`;

const PriceSeparator = styled.div`
    width: 0.1rem;
    height: 5rem;
    background-color: ${theme.colors.gray[100]};
    margin: 0 2rem;
`;

const BottomSection = styled.div`
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
`;

const BuySection = styled.div`
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
`;

const BidSection = styled.div`
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
`;
