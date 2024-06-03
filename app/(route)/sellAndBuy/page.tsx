'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import BidSectionPage from './BidSection';
import BuySectionPage from './BuySection';

const SellAndBuyPage = () => {

    const [view, setView] = useState('buy');

    return (
        <MainContainer>
            <SellAndBuyContainer>
                <TopSection>
                    <Image src="" alt="Product Image" />
                    <ProductInfo>
                        <EngProductName>상품 영문</EngProductName>
                        <KorProductName>상품 국문</KorProductName>
                        <Size>사이즈</Size>
                    </ProductInfo>
                </TopSection>
                <Separator />
                <PriceInfo>
                    <PriceContainer>
                        <PriceLabel>즉시 구매가</PriceLabel>
                        <Price>200,000</Price>
                    </PriceContainer>
                    <PriceSeparator />
                    <PriceContainer>
                        <PriceLabel>즉시 판매가</PriceLabel>
                        <Price>250,000</Price>
                    </PriceContainer>
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