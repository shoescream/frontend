/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import SizeModal from '../common/Modal/SizeModal';
import PriceGrid from './PriceGrid';
import theme from '@/styles/theme';
import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components';
import Button from '../common/Button';
import useAddComma from '@/hooks/useAddComma';
import { useRouter } from 'next/navigation';
import { DetailProduct } from '@/hooks/queries/useProduct';

interface SellOrBuySizeModalProps {
  data: DetailProduct;
  onClose: () => void;
  type: 'buy' | 'sell';
}

const SellOrBuySizeModal = ({
  onClose,
  data,
  type,
}: SellOrBuySizeModalProps) => {
  const productData = data.productResponse;
  const priceData =
    type === 'buy'
      ? data.productOptionResponse.sizeAndPriceBuyInfo
      : data.productOptionResponse.sizeAndPriceSellInfo;
  const [clickedItem, setClickedItem] = useState(0);
  const [selectedPrice, setSelectedPrice] = useState<number>(
    priceData[clickedItem]
  );

  const router = useRouter();
  const addComma = useAddComma();

  useEffect(() => {
    setSelectedPrice(priceData[clickedItem]);
  }, [clickedItem, priceData]);

  return (
    <StyledSizeModal onClose={onClose} height="61.4rem">
      <ModalContent style={{ height: 'calc(100% - 5rem)' }}>
        <ModalHeader>
          <div style={{ width: '3.5rem' }} />
          <p style={{ fontSize: '2rem', textAlign: 'center' }}>
            <strong style={{ fontSize: '1.8rem' }}>
              {type === 'sell' ? '판매하기' : '구매하기'}
            </strong>
            <br />
            <span
              style={{
                fontSize: '1.4rem',
                color: theme.colors.text.secondary,
                fontWeight: 300,
              }}
            >
              (가격 단위: 원)
            </span>
          </p>
          <IoCloseOutline
            size={35}
            strokeOpacity={0.6}
            style={{ cursor: 'pointer' }}
            onClick={onClose}
          />
        </ModalHeader>
        <div
          style={{
            padding: '0 3.2rem',
            maxHeight: 'calc(100% - 12rem)',
            overflowY: 'auto',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '2rem',
              position: 'relative',
              width: '100%',
              gap: '1.6rem',
              fontSize: '1.4rem',
              paddingBottom: '2rem',
              borderBottom: '0.1rem solid #ebebeb',
            }}
          >
            <img
              src={productData.productImageResponse.productImage[0]}
              alt={productData.productName}
              width={80}
              height={80}
              style={{ borderRadius: '0.8rem' }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.4rem',
              }}
            >
              <strong>{productData.productCode}</strong>
              <p>{productData.productName}</p>
              <p style={{ color: theme.colors.border }}>
                {productData.productSubName}
              </p>
            </div>
          </div>
          <PriceGrid
            data={priceData}
            clickedItem={clickedItem}
            onSetClickedItem={setClickedItem}
            isTypeSell
          />
        </div>
      </ModalContent>
      {clickedItem !== 0 && (
        <ModalFooter>
          <Button
            type="button"
            buttonColor="dark"
            size="full"
            style={{ position: 'absolute', bottom: 0 }}
            onClick={() => {
              const route = type === 'sell' ? '/sell' : '/buy';
              router.push(
                `${route}/${productData.productNumber}?type=ask&size=${[
                  clickedItem,
                ]}`
              );
            }}
          >
            <PriceText>{addComma(selectedPrice)}원</PriceText>
            <DeliveryText>일반배송(5-7일 소요)</DeliveryText>
          </Button>
        </ModalFooter>
      )}
    </StyledSizeModal>
  );
};

export default SellOrBuySizeModal;

const StyledSizeModal = styled(SizeModal)`
  position: relative;
`;

const ModalContent = styled.div`
  flex: 1;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.6rem;
`;

const ModalFooter = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 2rem;
`;

const PriceText = styled.strong`
  font-size: 1.4rem;
`;

const DeliveryText = styled.p`
  font-size: 1rem;
`;
