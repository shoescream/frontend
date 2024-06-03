import { ProductHistory } from '@/hooks/queries/useHistory';
import theme from '@/styles/theme';
import moment from 'moment';
import styled from 'styled-components';

interface SetHistoryListProps {
  selectState: number[];
  bidding: ProductHistory;
  pending: ProductHistory;
  finished: ProductHistory;
}

const SetHistoryList = ({
  selectState,
  bidding,
  pending,
  finished,
}: SetHistoryListProps) => {
  if (selectState[0] === 1) {
    return (
      <>
        {bidding && (
          <>
            {bidding.result.map((data, idx) => (
              <ItemBox key={idx}>
                <ProductInfo key={idx}>
                  <img src={data.productImage} alt={data.productImage} />
                  <ProductNameOption>
                    <p id="product_name">{data.productName}</p>
                    <p id="product_option">{data.size}</p>
                  </ProductNameOption>
                </ProductInfo>
                <ItemOption>
                  <p>{data.price}</p>
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
        {pending && (
          <>
            {pending.result.map((data, idx) => (
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
        {finished && (
          <>
            {finished.result.map((data, idx) => (
              <ItemBox key={idx}>
                <ProductInfo key={idx}>
                  <img />
                  <ProductNameOption>
                    <p id="product_name">{data.productName}</p>
                    <p id="product_option">{data.size}</p>
                  </ProductNameOption>
                </ProductInfo>
                <ItemOption>
                  <p>{moment(data.tradedAt).format('YY-MM-DD')}</p>
                  <p>{data.status}</p>
                </ItemOption>
              </ItemBox>
            ))}
          </>
        )}
      </>
    );
  }
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
    margin: 0 5rem;
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
