'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import theme from '@/styles/theme';
import SellOrBuyBidSection from '@/components/DetailProduct/SellOrBuyBidSection';
import SellOrBuySection from '@/components/DetailProduct/SellOrBuySection';
import { useBuyProducts } from '@/hooks/queries/useSellAndBuyProducts';
import { usePathname, useSearchParams } from 'next/navigation';
import useAddComma from '@/hooks/useAddComma';

const BuyAsk = () => {
  const [view, setView] = useState('buy');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const productNumber = parseInt(pathname.replace('/buy/', ''), 10);
  const size = searchParams.get('size') || '';
  const { data } = useBuyProducts(String(productNumber), size);

  const addComma = useAddComma();

  const handlePriceChange = (isHigher: boolean) => {
    if (isHigher) {
      setView('buy');
    }
  };

  return (
    <MainContainer>
      <BuyContainer>
        <TopSection>
          {data && (
            <>
              <Image
                referrerPolicy="no-referrer"
                src={data.productImage}
                alt={data.productName}
              />
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
              buttonColor={view === 'bid' ? 'buying' : 'none'}
              onClick={() => setView('bid')}
              styles={{
                margin: '0.5rem',
                height: '4rem',
                fontSize: '1.2rem',
                border: 'none',
                borderRadius: '3rem',
              }}
            >
              구매 입찰
            </Button>
            <Button
              buttonColor={view === 'buy' ? 'buying' : 'none'}
              onClick={() => setView('buy')}
              styles={{
                margin: '0.5rem',
                height: '4rem',
                fontSize: '1.2rem',
                border: 'none',
                borderRadius: '3rem',
              }}
            >
              즉시 구매
            </Button>
          </ButtonContainer>
          {view === 'buy' && data && (
            <SellOrBuySection type={'buy'} price={data.lowestPrice} />
          )}
          {view === 'bid' && data && (
            <SellOrBuyBidSection
              type={'buy'}
              price={0}
              immediatePurchasePrice={data.lowestPrice}
              onPriceBuyChange={handlePriceChange}
              onPriceSellChange={function (isLower: boolean): void {}}
            />
          )}
        </BottomSection>
      </BuyContainer>
    </MainContainer>
  );
};

export default BuyAsk;

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
  background-color: ${theme.colors.gray[100]};
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
  justify-content: center;
  align-items: center;
  background-color: ${theme.colors.gray[100]};
  border-radius: 3rem;
  height: 5rem;
  margin: 1rem;
`;
