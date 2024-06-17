import React, { useState, useEffect, ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import useAddComma from '@/hooks/useAddComma';

interface SellOrBuyBidSectionProps {
    type: 'buy' | 'sell';
    price: number;
    immediatePurchasePrice: number; 
    onPriceBuyChange: (isHigher: boolean) => void; 
    onPriceSellChange: (isLower: boolean) => void; 
}

const SellOrBuyBidSection: React.FC<SellOrBuyBidSectionProps> = ({ type, price, immediatePurchasePrice, onPriceBuyChange, onPriceSellChange }) => {
    const [inputPrice, setInputPrice] = useState('');
    const [inputError, setInputError] = useState('');
    const [expiry, setExpiry] = useState<number | null>(null);
    const [expiryDate, setExpiryDate] = useState('');
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const addComma = useAddComma();

    useEffect(() => {
        handleExpiryChange(180);
    }, []);

    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, '');
        if (/^\d+$/.test(value) && parseInt(value) >= 20000 && parseInt(value) % 1000 === 0) {
            const newPrice = parseInt(value);
            setInputPrice(addComma(newPrice));
            setInputError('');
            onPriceBuyChange(newPrice >= immediatePurchasePrice);
            onPriceSellChange(newPrice <= immediatePurchasePrice);
        } else {
            setInputPrice(value);
            setInputError('2만원부터 천원단위로 입력하세요.');
            onPriceBuyChange(false);
            onPriceSellChange(false);
        }
    };

    const handleExpiryChange = (days: number) => {
        const today = new Date();
        today.setDate(today.getDate() + days);
        const formattedDate = today.toISOString().split('T')[0];
        setExpiry(days);
        setExpiryDate(formattedDate);
        setSelectedButton(days);
    };

    return (
        <Section>
            <InfoRow>
                <InfoLabel>{type === 'buy' ? '구매 희망가' : '판매 희망가'}</InfoLabel>
                {inputError && <ErrorText>{inputError}</ErrorText>}
            </InfoRow>
            <InfoRow style={{ justifyContent: 'flex-end' }}>
                <InputWrapper>
                    <Input
                        style={{ textAlign: 'right', marginTop: '0.2rem', marginRight: '0.2rem', border: 'none' }}
                        type="text"
                        placeholder="희망가 입력"
                        value={inputPrice}
                        onChange={handlePriceChange}
                        isError={!!inputError}
                    />
                    <InputUnit>원</InputUnit>
                </InputWrapper>
            </InfoRow>
            <Separator isError={!!inputError} />
            <InfoText>총 결제 금액은 다음 화면에서 계산됩니다.</InfoText>
            <Separator />
            <InfoLabel>입찰 마감기한</InfoLabel>
            {expiry !== null && <ExpiryText>{expiry}일 ({expiryDate} 마감)</ExpiryText>}
            <ButtonContainer>
                {[1, 3, 7, 30, 60, 90, 180].map((days) => (
                    <Button
                        key={days}
                        buttonColor={selectedButton === days ? 'none' : 'none'}
                        size='small'
                        onClick={() => handleExpiryChange(days)}
                        styles={{
                            fontSize: '1.2rem',
                            height: '4rem',
                            border: selectedButton === days ? '0.2rem solid black' : '0.1rem solid gray',
                        }}
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
            <Button
                type='button'
                buttonColor='dark'
                size='full'
                styles={{
                    fontSize: '1.2rem',
                }}
            >
                {type === 'buy' ? '구매 입찰 계속' : '판매 입찰 계속'}
            </Button>
        </Section>
    );
};

export default SellOrBuyBidSection;

const Separator = styled.div<{ isError?: boolean }>`
    width: 100%;
    height: 0.1rem;
    background-color: ${props => props.isError ? 'red' : theme.colors.gray[100]};
    margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 2rem;
`;

const Section = styled.div`
    padding: 1rem;
    border-radius: 0.5rem;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
`;

const InfoLabel = styled.strong`
    font-size: 1.2rem;
    color: black;
    text-align: left;
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

interface InputProps {
    isError: boolean;
}

const Input = styled.input<InputProps>`
    font-size: 1.5rem;
    &:focus {
        outline: none;
        border-bottom: 1px solid ${props => props.isError ? 'red' : 'black'};
    }
    &::placeholder {
        text-decoration: none;
    }
`;

const ErrorText = styled.p`
    font-size: 1rem;
    color: red;
    text-align: right;
    margin-top: 0;
    margin-bottom: 0;
`;

const ExpiryText = styled.p`
    font-size: 1.2rem;
    color: black;
    margin-top: 0.5rem;
`;

const InputWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const InputUnit = styled.span`
    align-self: flex-end;
    font-size: 1.8rem;
`;
