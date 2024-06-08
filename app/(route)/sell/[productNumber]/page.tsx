'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import BidSectionPage from './BidSection';
import SellSectionPage from './SellSection';
import { useSellProducts } from '@/hooks/queries/useSellAndBuyProducts';
import { usePathname } from 'next/navigation';

const SellPage = () => {
    const [view, setView] = useState('sell');
    const pathname = usePathname();

    const productNumber = parseInt(pathname.replace('/sell/', ''), 10);
    const { data } = useSellProducts(productNumber);

    return (
        <MainContainer>
            <SellContainer>
                <TopSection>
                    {data && data.length > 0 && (
                        <>
                            <Image/>
                            <ProductInfo>
                                <EngProductName>{data[0].productName}</EngProductName>
                                <KorProductName>{data[0].productSubName}</KorProductName>
                                <Size>사이즈</Size>
                            </ProductInfo>
                        </>
                    )}
                </TopSection>
                <Separator />
                <PriceInfo>
                    {data && data.length > 0 && (
                        <>
                            <PriceContainer>
                                <PriceLabel>즉시 구매가</PriceLabel>
                                <Price>{data[0].lowestPrice}</Price>
                            </PriceContainer>
                            <PriceSeparator />
                            <PriceContainer>
                                <PriceLabel>즉시 판매가</PriceLabel>
                                <Price>{data[0].highestPrice}</Price>
                            </PriceContainer>
                        </>
                    )}
                </PriceInfo>
                <BottomSection>
                    <ButtonContainer>
                        <Button
                            type='button'
                            buttonColor={view === 'bid' ? 'selling' : 'none'}
                            size='xlarge'
                            onClick={() => setView('bid')}
                        >
                            판매 입찰
                        </Button>
                        <Button
                            type='button'
                            buttonColor={view === 'sell' ? 'selling' : 'none'}
                            size='xlarge'
                            onClick={() => setView('sell')}
                        >
                            즉시 판매
                        </Button>
                    </ButtonContainer>
                    {view === 'sell' && <SellSectionPage />}
                    {view === 'bid' && <BidSectionPage />}
                </BottomSection>
            </SellContainer>
        </MainContainer>
    );
};

export default SellPage;

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.gray[100]};
`;

const SellContainer = styled.div`
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
