import { useGetBid, useGetTransactions } from '@/hooks/queries/useProduct';
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
  const { data: transactionData } = useGetTransactions({
    productNumber,
    size: size ? String(size) : 'allSize',
  });
  const { data: bidData } = useGetBid({
    productNumber,
    size: size ? String(size) : 'allSize',
  });

  return (
    <>
      {bidData && transactionData && (
        <div style={{ marginTop: '2rem' }}>
          <FilterBox
            data={['체결 거래', '판매 입찰', '구매 입찰']}
            onClick={(item) => onSetCurrentFilterBySize(item)}
            currentClickedItem={currentFilterBySize}
          >
            <BuyingTable
              data={
                currentFilterBySize === '판매 입찰'
                  ? bidData?.sellingBidResponse!
                  : currentFilterBySize === '구매 입찰'
                  ? bidData?.buyingBidResponse!
                  : transactionData?.dealResponse!.map((el) => {
                      return {
                        createdAt: el.tradedAt,
                        size: el.size,
                        price: el.price,
                        quantity: NaN,
                      };
                    })!
              }
            />
          </FilterBox>
        </div>
      )}
    </>
  );
};

export default Bids;
