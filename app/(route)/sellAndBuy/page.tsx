'use client';

import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';

const StyledButton = styled(Button)`
    color: ${theme.colors.text.primary}; // 텍스트 색상을 검정으로 설정합니다.
`;

const SellAndBuyPage = () => {
    const [view, setView] = useState('buy');
    const [bidPrice, setBidPrice] = useState('');
    const [bidError, setBidError] = useState('');
    const [expiry, setExpiry] = useState<number | null>(null);
    const [expiryDate, setExpiryDate] = useState('');

    const handleBidPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d+$/.test(value) && parseInt(value) >= 20000 && parseInt(value) % 1000 === 0) {
            setBidPrice(value);
            setBidError('');
        } else {
            setBidPrice(value);
            setBidError('2만원부터 천원단위로 입력하세요.');
        }
    };

    const handleExpiryChange = (days: number) => {
        const today = new Date();
        today.setDate(today.getDate() + days);
        const formattedDate = today.toISOString().split('T')[0];
        setExpiry(days);
        setExpiryDate(formattedDate);
    };

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
                    {view === 'buy' && (
                        <BuySection>
                            <InfoRow>
                                <InfoLabel>즉시 구매가</InfoLabel>
                                <InfoValue onClick={() => setView('bid')}>136,000원</InfoValue>
                            </InfoRow>
                            <Separator />
                            <InfoText>총 결제 금액은 다음 화면에서 계산됩니다.</InfoText>
                            <Separator />
                            <InfoRow>
                                <InfoLabel>총 결제금액</InfoLabel>
                                <Next>다음 화면에서 확인</Next>
                            </InfoRow>
                            <Button type='button' buttonColor='dark' size='full'>즉시 구매 계속</Button>
                        </BuySection>
                    )}
                    {view === 'bid' && (
                        <BidSection>
                            <InfoRow>
                                <InfoLabel>구매 희망가</InfoLabel>
                                <BidInput
                                    type="text"
                                    placeholder="희망가 입력"
                                    value={bidPrice}
                                    onChange={handleBidPriceChange}
                                    isError={!!bidError}
                                />
                            </InfoRow>
                            {bidError && <ErrorText>{bidError}</ErrorText>}
                            <Separator />
                            <InfoText>총 결제 금액은 다음 화면에서 계산됩니다.</InfoText>
                            <Separator />
                            <InfoLabel>입찰 마감기한</InfoLabel>
                            {expiry !== null && <ExpiryText>{expiry}일 ({expiryDate} 마감)</ExpiryText>}
                            <ButtonContainer>
                                {[1, 3, 7, 30, 60, 90, 180].map((days) => (
                                    <Button
                                        key={days}
                                        buttonColor='light'
                                        size='small'
                                        onClick={() => handleExpiryChange(days)}
                                    >
                                        {days}일
                                    </Button>
                                ))}
                            </ButtonContainer>
                            <Separator />
                            <InfoRow>
                                <InfoLabel>총 결제금액</InfoLabel>
                                <Next>다음 화면에서 확인</Next>
                            </InfoRow>
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

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
`;

const InfoLabel = styled.strong`
    font-size: 1.2rem;
    color: black;
    text-align: left;
`;

const InfoValue = styled.strong`
    font-size: 1.8rem;
    margin-bottom: 1rem;
    cursor: text;
`;

const InfoText = styled.p`
    font-size: 1.2rem;
    color: gray;
    text-align: left;
    margin-bottom: 2rem;
`;

const Next = styled.p`
    font-size: 1.2rem;
    color: ${theme.colors.gray[200]};
`;

interface BidInputProps {
    isError: boolean;
}

const BidInput = styled.input<BidInputProps>`
    font-size: 1.2rem;
    padding: 0.5rem;
    border: none;
    border-bottom: 1px solid ${props => props.isError ? 'red' : 'black'};
    &:focus {
        outline: none;
        border-bottom: 1px solid ${props => props.isError ? 'red' : 'black'};
    }
`;

const ErrorText = styled.p`
    font-size: 1rem;
    color: red;
    text-align: right;
    margin-top: 0;
    margin-bottom: 1rem;
`;

const BidButton = styled.button`
    background: ${theme.colors.gray[200]};
    border: none;
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
    cursor: pointer;
    &:hover {
        background: ${theme.colors.gray[300]};
    }
`;

const ExpiryText = styled.p`
    font-size: 1.2rem;
    color: black;
    margin-top: 0.5rem;
`;
