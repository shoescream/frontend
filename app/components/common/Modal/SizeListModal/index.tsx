import React from 'react';
import SizeModal from '../SizeModal';
import styled from 'styled-components';
import PriceGrid from '@/components/DetailProduct/PriceGrid';
import Button from '../../Button';

const SIZES: { [key: string]: number } = Object.assign(
  {},
  ...new Array(17).fill(0).map((_, i) => {
    return {
      [`${220 + i * 5}`]: 0,
    };
  })
);

interface SizeListModalProps {
  onClose: () => void;
  currentItem: number;
  onSetCurrentItem: (value: number) => void;
  onSetValue: (value: number) => void;
}

const SizeListModal = ({
  onClose,
  currentItem,
  onSetCurrentItem,
  onSetValue,
}: SizeListModalProps) => {
  return (
    <SizeModal
      title="사이즈 선택"
      onClose={onClose}
      style={{ height: '42.6rem', width: '44.8rem' }}
    >
      <div style={{ padding: '0 3.2rem', position: 'relative' }}>
        <PriceGrid
          data={SIZES}
          clickedItem={currentItem}
          onSetClickedItem={onSetCurrentItem}
          customGridTemplate="1fr 1fr 1fr"
          itemStyle={{ height: '5rem' }}
        />
        <ModalButtonWrapper>
          <Button
            size="medium"
            color="dark"
            customFontSize="1.4rem"
            styles={{ height: '4.2rem' }}
            onClick={() => {
              onSetValue(Number(currentItem));
              onClose();
            }}
          >
            확인
          </Button>
        </ModalButtonWrapper>
      </div>
    </SizeModal>
  );
};

export default SizeListModal;

const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 2.4rem 3.2rem 3.4rem;
  position: sticky;
  bottom: 0;
  background-color: white;
`;
