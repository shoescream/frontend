import useAddComma from '@/hooks/useAddComma';
import theme from '@/styles/theme';
import React from 'react';
import styled, { CSSProperties } from 'styled-components';

interface PriceGridProps {
  data: {
    [key: string]: number;
  };
  clickedItem: number;
  onSetClickedItem: (index: number) => void;
  isForLookingSizes?: boolean;
  isTypeSell?: boolean;
  customGridTemplate?: string;
  itemStyle?: { height: string };
}

const PriceGrid = ({
  data,
  clickedItem,
  onSetClickedItem,
  isForLookingSizes = false,
  isTypeSell,
  customGridTemplate,
}: PriceGridProps) => {
  const addComma = useAddComma();

  console.log(data);

  return (
    <Grid style={{ gridTemplateColumns: customGridTemplate || '1fr 1fr 1fr' }}>
      {Object.keys(data).map((size, index) => {
        return (
          <GridItem
            key={size}
            $clicked={clickedItem === Number(size)}
            onClick={() => onSetClickedItem(Number(size))}
          >
            <GridItemTitle $clicked={clickedItem === Number(size)}>
              {index === 0 && isForLookingSizes ? (
                <strong>모든 사이즈</strong>
              ) : (
                size
              )}
            </GridItemTitle>
            <GridItemPrice
              $isTypeSell={isTypeSell!}
              $isFirstItem={index === 0 && isForLookingSizes}
              $clicked={clickedItem === Number(index)}
            >
              {isForLookingSizes && index === 0 ? (
                <strong>구매입찰</strong>
              ) : (
                addComma(data[size]) + '원'
              )}
            </GridItemPrice>
          </GridItem>
        );
      })}
    </Grid>
  );
};

export default PriceGrid;

const Grid = styled.div`
  display: grid;
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

const GridItemPrice = styled.p<{
  $isFirstItem: boolean;
  $clicked: boolean;
  $isTypeSell: boolean;
}>`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  font-weight: ${(props) => (props.$clicked ? 600 : 400)};
  color: ${({ $isFirstItem, $isTypeSell }) =>
    $isFirstItem
      ? theme.colors.main
      : $isTypeSell
      ? theme.colors.selling
      : theme.colors.buying};
`;
