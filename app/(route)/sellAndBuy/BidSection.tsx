import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';

const BidSectionPage = () => {
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
        <BidSection>
            <InfoRow>
                <InfoLabel>구매 희망가</InfoLabel>
                <InfoRow>
                    <BidInputWrapper>
                        <BidInput
                            style={{textAlign: 'right', marginRight: '0.2rem'}}
                            type="text"
                            placeholder="희망가 입력"
                            value={bidPrice}
                            onChange={handleBidPriceChange}
                            isError={!!bidError}
                        />
                        <BidInputUnit>원</BidInputUnit>
                    </BidInputWrapper>
                </InfoRow>

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
                        type='button'
                        buttonColor='none'
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

const Separator = styled.div`
    width: 100%;
    height: 0.1rem;
    background-color: ${theme.colors.gray[100]};
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
    margin-bottom: 1rem;
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
    font-size: 1.2rem;
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

const BidInputWrapper = styled.div`
    display: flex;
    align-items: center;
`;


const BidInputUnit = styled.span`
    align-self: flex-end; // 텍스트 "원"을 아래 정렬합니다.
`;
