/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import SizeModal from '../common/Modal/SizeModal';
import PriceGrid from './PriceGrid';
import theme from '@/styles/theme';
import { IoCloseOutline } from 'react-icons/io5';
import styled from 'styled-components';

interface SellOrBuySizeModalProps {
  data: {
    size: string;
    price: number;
  }[];
  onClose: () => void;
  type: 'buy' | 'sell';
}

const SellOrBuySizeModal = ({
  onClose,
  data,
  type,
}: SellOrBuySizeModalProps) => {
  const [clickedItem, setClickedItem] = useState(0);

  return (
    <SizeModal onClose={onClose} height="61.4rem">
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
      <div style={{ padding: '0 3.2rem' }}>
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
            src="https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="product image"
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
            <strong>FD0736-001</strong>
            <p>Nike V2K Run Black Anthracite</p>
            <p style={{ color: theme.colors.border }}>
              나이키 V2K 런 블랙 앤트러사이트
            </p>
          </div>
        </div>
        <PriceGrid
          data={data}
          clickedItem={clickedItem}
          onSetClickedItem={setClickedItem}
        />
      </div>
    </SizeModal>
  );
};

export default SellOrBuySizeModal;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.6rem;
`;
