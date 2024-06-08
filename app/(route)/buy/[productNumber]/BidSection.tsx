import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import useAddComma from '@/hooks/useAddComma';

const BidSectionPage = () => {
    const [bidPrice, setBidPrice] = useState('');
    const [bidError, setBidError] = useState('');
    const [expiry, setExpiry] = useState<number | null>(null);
    const [expiryDate, setExpiryDate] = useState('');
    const [selectedButton, setSelectedButton] = useState<number | null>(null);

    const addComma = useAddComma();

    const handleBidPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/,/g, ''); 
        if (/^\d+$/.test(value) && parseInt(value) >= 20000 && parseInt(value) % 1000 === 0) {
            setBidPrice(addComma(parseInt(value))); 
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
        setSelectedButton(days);
    };

    return (
        <BidSection>
            <InfoRow>
                <InfoLabel>구매 희망가</InfoLabel>
                {bidError && <ErrorText>{bidError}</ErrorText>}
            </InfoRow>
            <InfoRow style={{ justifyContent: 'flex-end' }}>
                <BidInputWrapper>
                    <BidInput
                        style={{ textAlign: 'right', marginTop: '0.2rem', marginRight: '0.2rem', border: 'none' }}
                        type="text"
                        placeholder="희망가 입력"
                        value={bidPrice}
                        onChange={handleBidPriceChange}
                        isError={!!bidError}
                    />
                    <BidInputUnit>원</BidInputUnit>
                </BidInputWrapper>
            </InfoRow>
            <Separator isError={!!bidError} />
            <InfoText>총 결제 금액은 다음 화면에서 계산됩니다.</InfoText>
            <Separator />
            <InfoLabel>입찰 마감기한</InfoLabel>
            {expiry !== null && <ExpiryText>{expiry}일 ({expiryDate} 마감)</ExpiryText>}
            <ButtonContainer>
                {[1, 3, 7, 30, 60, 90, 180].map((days) => (
                    <Button
                        key={days}
                        type='button'
                        buttonColor={selectedButton === days ? 'dark' : 'none'}
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
    );
};

export default BidSectionPage;

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

const BidSection = styled.div`
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

interface BidInputProps {
    isError: boolean;
}

const BidInput = styled.input<BidInputProps>`
    font-size: 1.8rem; 
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

const BidInputWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const BidInputUnit = styled.span`
    align-self: flex-end;
    font-size: 1.5rem;
    // text-style: bold;
`;
