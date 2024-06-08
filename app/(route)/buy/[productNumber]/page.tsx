'use client';

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import BidSectionPage from './BidSection';
import BuySectionPage from './BuySection';
import { useBuyProducts } from '@/hooks/queries/useSellAndBuyProducts';
import { usePathname } from 'next/navigation';
import useAddComma from '@/hooks/useAddComma';

const BuyPage: React.FC = () => {
    const [view, setView] = useState('buy');
    const pathname = usePathname();

    const productNumber = parseInt(pathname.replace('/buy/', ''), 10);
    const size = '230'; // 임시 설정
    const { data } = useBuyProducts(productNumber, size);

    const addComma = useAddComma();

    console.log("BUY PAGE DATA2: ", data);
    console.log("BUY PAGE DATA: ", data && data.highestPrice ? data.highestPrice : "No data available");

    return (
        <MainContainer>
            <BuyContainer>
                <TopSection>
                    {data && (
                        <>
                            <Image/>
                            <ProductInfo>
                                <EngProductName>{data.productName}</EngProductName>
                                <KorProductName>{data.productSubName}</KorProductName>
                                <Size>{size}</Size>
                            </ProductInfo>
                        </>
                    )}
                </TopSection>
                <Separator />
                <PriceInfo>
                    {data && (
                        <>
                            <PriceContainer>
                                <PriceLabel>즉시 구매가</PriceLabel>
                                <Price>{addComma(data.lowestPrice)}원</Price>
                            </PriceContainer>
                            <PriceSeparator />
                            <PriceContainer>
                                <PriceLabel>즉시 판매가</PriceLabel>
                                <Price>{addComma(data.highestPrice)}원</Price>
                            </PriceContainer>
                        </>
                    )}
                </PriceInfo>
                <BottomSection>
                    <ButtonContainer>
                        <Button
                            type='button'
                            buttonColor={view === 'bid' ? 'buying' : 'none'}
                            size='xlarge'
                            onClick={() => setView('bid')}
                        >
                            구매 입찰
                        </Button>
                        <Button
                            type='button'
                            buttonColor={view === 'buy' ? 'buying' : 'none'}
                            size='xlarge'
                            onClick={() => setView('buy')}
                        >
                            즉시 구매
                        </Button>
                    </ButtonContainer>
                    {view === 'buy' && data && <BuySectionPage lowestPrice={data.lowestPrice} />}
                    {view === 'bid' && <BidSectionPage />}
                </BottomSection>
            </BuyContainer>
        </MainContainer>
    );
};

export default BuyPage;

const MainContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${theme.colors.gray[100]};
`;

const BuyContainer = styled.div`
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