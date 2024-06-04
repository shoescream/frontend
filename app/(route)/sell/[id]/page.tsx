'use client';

import ProductBuyPage from '@/components/ProductPayPage/ProductPayPage';
import useAddComma from '@/hooks/useAddComma';
import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import Button from '@/components/common/Button';
import SellingAccountModal from '@/components/common/Modal/SellingAccountModal';
import ModifyButton from '@/components/common/Button/ModifyButton';

const TABLE_ITEM = [
  {
    title: '검수비',
    value: '무료',
  },
  {
    title: '수수료',
    value: '-15500',
  },
  {
    title: '배송비',
    value: '선불 · 판매자 부담',
  },
];

const Sell = () => {
  const addComma = useAddComma();
  const [isOpen, setIsOpen] = useState(false);
  const value = 228000;
  const result = Math.ceil(
    value +
      TABLE_ITEM.map((el) =>
        isNaN(Number(el.value)) ? 0 : Number(el.value)
      ).reduce((a, b) => a + b)
  );
  const [accountData, setAccountData] = useState({
    bankName: '',
    accountNumber: 0,
    depositor: '',
  });

  return (
    <>
      {isOpen && (
        <SellingAccountModal
          onClose={() => setIsOpen(false)}
          onSetAccountData={setAccountData}
          accountData={accountData}
        />
      )}
      <ProductBuyPage resultAmount={result}>
        <Section>
          <Title>판매 정산 계좌</Title>

          {accountData.accountNumber && accountData.depositor ? (
            <AccountRow>
              <p style={{ width: '50%' }}>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <AccountCategory>계좌</AccountCategory>
                  <p
                    style={{ fontSize: '1.4rem' }}
                  >{`${accountData.bankName} ${accountData.accountNumber}`}</p>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: '0.6rem',
                  }}
                >
                  <AccountCategory>예금주</AccountCategory>
                  <p style={{ fontSize: '1.4rem' }}>{accountData.depositor}</p>
                </div>
              </p>
              <ModifyButton
                onClickModify={() => setIsOpen(true)}
                style={{ position: 'static' }}
              >
                변경
              </ModifyButton>
            </AccountRow>
          ) : (
            <Row style={{ paddingTop: '1.2rem' }}>
              <NoAccount>
                {
                  '등록된 판매 정산계좌가 없습니다.\n새 계좌번호를 추가해주세요!'
                }
              </NoAccount>
              <Button
                size="small"
                styles={{
                  height: '3.4rem',
                  width: '7.2rem',
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  border: 'none',
                }}
                onClick={() => setIsOpen(true)}
              >
                계좌 추가
              </Button>
            </Row>
          )}
        </Section>
        <Section>
          <div style={{ width: '100%' }}>
            <p style={{ fontSize: '1.6rem', fontWeight: 500 }}>
              최종 주문 정보
            </p>
            <Row>
              <Category>즉시 판매가</Category>
              <strong style={{ fontSize: '1.4rem', fontWeight: 700 }}>
                {addComma(value)}원
              </strong>
            </Row>
            {TABLE_ITEM.map((item) => (
              <Row key={item.title}>
                <TableItem>{item.title}</TableItem>
                <TableItemValue>
                  {!isNaN(Number(item.value))
                    ? addComma(Number(item.value))
                    : item.value}
                </TableItemValue>
              </Row>
            ))}
          </div>
        </Section>
        <ResultSection>
          <Total>정산 금액</Total>
          <TotalValue>{addComma(result)}원</TotalValue>
        </ResultSection>
      </ProductBuyPage>
    </>
  );
};

export default Sell;

const Section = styled.section`
  width: 70rem;
  background-color: white;
  padding: 3.2rem;
  display: flex;
  margin-top: 0.8rem;

  &:nth-child(1) {
    margin-top: 0;
  }
  &:nth-child(2) {
    flex-direction: column;
  }
  &:nth-child(5) {
    flex-direction: column;
  }
  &:nth-child(6) {
    padding: 2.4rem 3.2rem 3.2rem;
  }
`;

const Title = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;

const Category = styled.h4`
  padding: 1.2rem 0 0.8rem;
  font-size: 1.5rem;
  font-weight: 300;
`;

const Row = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0.6rem;
  padding: 0.4rem 0;

  &:nth-child(2) {
    margin: 0;
    padding: 0;
  }
`;

const TableItem = styled.div`
  color: #22222250;
  min-width: 6.6rem;
  font-size: 1.4rem;
`;

const TableItemValue = styled.div`
  font-size: 1.4rem;
  color: ${theme.colors.main};
`;

const ResultSection = styled.section`
  width: 100%;
  padding: 2rem 3.2rem;
  background-color: rgb(250, 250, 250);
  border-top: 0.1rem solid rgb(240, 240, 240);
  border-bottom: 0.1rem solid rgb(240, 240, 240);
`;

const Total = styled.p`
  color: ${theme.colors.main};
  font-size: 1.6rem;
  font-weight: 600;
`;

const TotalValue = styled.p`
  padding-top: 0.8rem;
  color: ${theme.colors.main};
  font-size: 2rem;
  font-weight: 700;
  text-align: right;
`;

const NoAccount = styled.p`
  font-size: 1.4rem;
  line-height: 1.7rem;
  font-weight: 200;
  white-space: pre-line;
  color: ${theme.colors.text.primary};
`;

const AccountRow = styled(Row)`
  margin-top: 1.2rem;
  width: 100%;
  position: relative;
`;

const AccountCategory = styled.span`
  min-width: 8rem;
  font-size: 1.3rem;
  color: ${theme.colors.text.secondary};
`;
