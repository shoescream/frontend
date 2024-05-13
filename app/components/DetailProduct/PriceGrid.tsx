import useAddComma from '@/hooks/useAddComma';
import theme from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

interface PriceGridProps {
  data: {
    size: string;
    price: number;
  }[];
  clickedItem: number;
  onSetClickedItem: (index: number) => void;
  isForLookingSizes?: boolean;
}

const PriceGrid = ({
  data,
  clickedItem,
  onSetClickedItem,
  isForLookingSizes = false,
}: PriceGridProps) => {
  const addComma = useAddComma();

  return (
    <Grid>
      {data.map((item, index) => (
        <GridItem
          key={index}
          $clicked={clickedItem === index}
          onClick={() => onSetClickedItem(index)}
        >
          <GridItemTitle $clicked={clickedItem === index}>
            {index === 0 && isForLookingSizes ? (
              <strong>모든 사이즈</strong>
            ) : (
              item.size
            )}
          </GridItemTitle>
          <GridItemPrice
            $isFirstItem={index === 0 && isForLookingSizes}
            $clicked={clickedItem === index}
          >
            {isForLookingSizes && index === 0 ? (
              <strong>구매입찰</strong>
            ) : (
              addComma(item.price) + '원'
            )}
          </GridItemPrice>
        </GridItem>
      ))}
    </Grid>
  );
};

export default PriceGrid;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.8rem;
  row-gap: 0.8rem;
  margin-top: 1rem;
  margin-bottom: 3.2rem;
`;

const GridItem = styled.div<{ $clicked: boolean }>`
  height: 6rem;
  width: 100%;
  border-radius: 1rem;
  border: 0.1rem solid
    ${({ $clicked }) => ($clicked ? theme.colors.main : theme.colors.border)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const GridItemTitle = styled.p<{ $clicked: boolean }>`
  font-size: 1.4rem;
  font-weight: ${(props) => (props.$clicked ? 600 : 400)};
`;

const GridItemPrice = styled.p<{ $isFirstItem: boolean; $clicked: boolean }>`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  font-weight: ${(props) => (props.$clicked ? 600 : 400)};
  color: ${({ $isFirstItem }) =>
    $isFirstItem ? theme.colors.main : theme.colors.buying};
`;
