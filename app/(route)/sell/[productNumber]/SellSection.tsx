import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';

const SellSectionPage = () => {
    const [view, setView] = useState('buy');

    return (
        <BuySection>
            <InfoRow>
                <InfoLabel>즉시 판매가</InfoLabel>
                <InfoValue onClick={() => setView('bid')}>136,000원</InfoValue>
            </InfoRow>
            <Separator />
            <InfoText>총 결제 금액은 다음 화면에서 계산됩니다.</InfoText>
            <Separator />
            <InfoRow>
                <InfoLabel>정산 금액</InfoLabel>
                <TotalPrice>120,000원</TotalPrice>
            </InfoRow>
            <Button type='button' buttonColor='dark' size='full'>즉시 판매 계속</Button>
        </BuySection>
    );
};

export default SellSectionPage;

const Separator = styled.div`
    width: 100%;
    height: 0.1rem;
    background-color: ${theme.colors.gray[100]};
    margin-bottom: 2rem;
`;

const BuySection = styled.div`
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

const TotalPrice = styled.strong`
    font-size: 1.8rem;
    color: ${theme.colors.selling};
`;
