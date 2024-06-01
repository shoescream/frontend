/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import SizeModal from '../common/Modal/SizeModal';
import styled from 'styled-components';
import PriceGrid from './PriceGrid';
import { IoCloseOutline } from 'react-icons/io5';

interface BySizeModalProps {
  onClose: () => void;
  data: {
    [key: string]: number;
  }[];
  currentItem: number;
  onSetCurrentItem: (value: number) => void;
}

const BySizeModal = ({
  onClose,
  data,
  currentItem,
  onSetCurrentItem,
}: BySizeModalProps) => {
  return (
    <SizeModal onClose={onClose}>
      <ModalHeader>
        <div />
        <h1 style={{ fontSize: '2rem' }}>사이즈</h1>
        <IoCloseOutline
          size={24}
          style={{ cursor: 'pointer' }}
          onClick={onClose}
        />
      </ModalHeader>
      <div style={{ padding: '0 3.2rem' }}>
        <PriceGrid
          isForLookingSizes
          data={data}
          clickedItem={currentItem}
          onSetClickedItem={onSetCurrentItem}
        />
      </div>
    </SizeModal>
  );
};

export default BySizeModal;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.6rem;
`;
