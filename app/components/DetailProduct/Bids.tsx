import { useGetBid } from '@/hooks/queries/useProduct';
import React from 'react';
import FilterBox from '../FilterBox/FilterBox';
import BuyingTable from './BuyingTable';

interface BidsProps {
  productNumber: string;
  size: number;
  currentFilterBySize: string;
  onSetCurrentFilterBySize: (value: string) => void;
}

const Bids = ({
  productNumber,
  size,
  currentFilterBySize,
  onSetCurrentFilterBySize,
}: BidsProps) => {
  const { data } = useGetBid({ productNumber, size: String(size) });

  return (
    <>
      {data?.sellingBidResponse && data?.buyingBidResponse && (
        <div style={{ marginTop: '2rem' }}>
          <FilterBox
            data={['체결 거래', '판매 입찰', '구매 입찰']}
            onClick={(item) => onSetCurrentFilterBySize(item)}
            currentClickedItem={currentFilterBySize}
          >
            <BuyingTable
              data={
                currentFilterBySize === '판매 입찰'
                  ? data?.sellingBidResponse!
                  : currentFilterBySize === '구매 입찰'
                  ? data?.buyingBidResponse!
                  : data?.buyingBidResponse!
              }
            />
          </FilterBox>
        </div>
      )}
    </>
  );
};

export default Bids;
