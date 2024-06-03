'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import BidSectionPage from './BidSection';
import BuySectionPage from './BuySection';
import { useBuyProducts } from '@/hooks/queries/useBuyProducts';

const SellAndBuyPage = () => {
    const [view, setView] = useState('buy');
    const productNumber = 1;
    const { data: products = [] } = useBuyProducts(productNumber);

    console.log('sell and buy data:', products);

    return (
        <MainContainer>
            <SellAndBuyContainer>
                <TopSection>
                    {products && products.length > 0 && (
                        <>
                            <Image>이미지</Image>
                            <ProductInfo>
                                <EngProductName>{products[0].productName}</EngProductName>
                                <KorProductName>{products[0].productSubName}</KorProductName>
                                <Size>사이즈</Size>
                            </ProductInfo>
                        </>
                    )}
                </TopSection>
                <Separator />
                <PriceInfo>
                    {products && products.length > 0 && (
                        <>
                            <PriceContainer>
                                <PriceLabel>즉시 구매가</PriceLabel>
                                <Price>{products[0].lowestPrice}</Price>
                            </PriceContainer>
                            <PriceSeparator />
                            <PriceContainer>
                                <PriceLabel>즉시 판매가</PriceLabel>
                                <Price>{products[0].highestPrice}</Price>
                            </PriceContainer>
                        </>
                    )}
                </PriceInfo>
                <BottomSection>
                    <ButtonContainer>
                        <Button
                            type='button'
                            buttonColor='buying'
                            size='xlarge'
                            onClick={() => setView('bid')}
                        >
                            구매 입찰
                        </Button>
                        <Button
                            type='button'
                            buttonColor='buying'
                            size='xlarge'
                            onClick={() => setView('buy')}
                        >
                            즉시 구매
                        </Button>
                    </ButtonContainer>
                    {view === 'buy' && <BuySectionPage />}
                    {view === 'bid' && <BidSectionPage />}
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
    font-size: 1.5rem;
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
