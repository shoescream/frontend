import { ProductHistory } from '@/hooks/queries/useHistory';
import useAddComma from '@/hooks/useAddComma';
import theme from '@/styles/theme';
import moment from 'moment';
import { useState } from 'react';
import styled from 'styled-components';
import RenderPageNumbers from '../common/RenderPaging';

interface SetHistoryListProps {
  selectState: number[];
  bidding: ProductHistory[];
  pending: ProductHistory[];
  finished: ProductHistory[];
}

const SetHistoryList = ({
  selectState,
  bidding,
  pending,
  finished,
}: SetHistoryListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [bidData, setBidData] = useState(bidding);
  const [penData, setPenData] = useState(pending);
  const [finData, setFinData] = useState(finished);
  const addComma = useAddComma();
  const pageSize = 5;
  const getTotalItems = () => {
    if (selectState[0] === 1) {
      return bidding.length;
    } else if (selectState[1] === 1) {
      return pending.length;
    } else if (selectState[2] === 1) {
      return finished.length;
    }
    return 0;
  };

  const totalItems = getTotalItems();
  const totalPages = Math.ceil(totalItems / pageSize);
  const renderItem = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = Math.min(startIndex + pageSize, totalItems);
    if (selectState[0] === 1) {
      return (
        <>
          {bidData && (
            <>
              {bidData.slice(startIndex, endIndex).map((data, idx) => (
                <ItemBox key={idx}>
                  <ProductInfo key={idx}>
                    <img src={data.productImage} alt={data.productImage} />
                    <ProductNameOption>
                      <p id="product_name">{data.productName}</p>
                      <p id="product_option">{data.size}</p>
                    </ProductNameOption>
                  </ProductInfo>
                  <ItemOption>
                    <p>{addComma(data.price)}</p>
                    <p>{moment(data.deadLine).format('YY-MM-DD')}</p>
                  </ItemOption>
                </ItemBox>
              ))}
            </>
          )}
        </>
      );
    } else if (selectState[1] === 1) {
      return (
        <>
          {penData && (
            <>
              {penData.slice(startIndex, endIndex).map((data, idx) => (
                <ItemBox key={idx}>
                  <ProductInfo key={idx}>
                    <img src={data.productImage} alt={data.productImage} />
                    <ProductNameOption>
                      <p id="product_name">{data.productName}</p>
                      <p id="product_option">{data.size}</p>
                    </ProductNameOption>
                  </ProductInfo>
                  <ItemOption>
                    <p>{data.status}</p>
                  </ItemOption>
                </ItemBox>
              ))}
            </>
          )}
        </>
      );
    } else if (selectState[2] === 1) {
      return (
        <>
          {finData && (
            <>
              {finData.slice(startIndex, endIndex).map((data, idx) => (
                <ItemBox key={idx}>
                  <ProductInfo key={idx}>
                    <img src={data.productImage} alt={data.productImage} />
                    <ProductNameOption>
                      <p id="product_name">{data.productName}</p>
                      <p id="product_option">{data.size}</p>
                    </ProductNameOption>
                  </ProductInfo>
                  <ItemOption>
                    <p>{data.status}</p>
                    <p>{moment(data.tradedAt).format('YY-MM-DD')}</p>
                  </ItemOption>
                </ItemBox>
              ))}
            </>
          )}
        </>
      );
    }
  };
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  return (
    <>
      {renderItem()}
      <RenderPageNumbers
        totalPages={totalPages}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
      />
    </>
  );
};
const ItemBox = styled.div`
  width: 90rem;
  margin: 1rem auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border: 0.1rem solid ${theme.colors.gray[200]};
  border-radius: 1rem;
  img {
    width: 8rem;
    height: 8rem;
    float: left;
    margin-right: 1rem;
  }
`;

const ProductInfo = styled.div`
  display: flex;
`;

const ItemOption = styled.div`
  display: flex;
  line-height: 8rem;
  p {
    width: 15rem;
    text-align: center;
  }
`;

const ProductNameOption = styled.div`
  padding: 1rem 0 0 1rem;
  #product_name {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  #product_option {
    font-size: ${theme.fontSize.subtitle3};
    color: ${theme.colors.gray[200]};
  }
`;
export default SetHistoryList;
