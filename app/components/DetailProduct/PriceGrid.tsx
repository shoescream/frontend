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
}

const PriceGrid = ({
  data,
  clickedItem,
  onSetClickedItem,
  isForLookingSizes = false,
  isTypeSell,
}: PriceGridProps) => {
  const addComma = useAddComma();

  return (
    <Grid>
      {Object.keys(data).map((key, index) => {
        return (
          <GridItem
            key={key}
            $clicked={clickedItem === Number(key)}
            onClick={() => onSetClickedItem(Number(key))}
          >
            <GridItemTitle $clicked={clickedItem === Number(key)}>
              {index === 0 && isForLookingSizes ? (
                <strong>모든 사이즈</strong>
              ) : (
                key
              )}
            </GridItemTitle>
            <GridItemPrice
              $isTypeSell={isTypeSell!}
              $isFirstItem={index === 0 && isForLookingSizes}
              $clicked={clickedItem === Number(key)}
            >
              {isForLookingSizes && index === 0 ? (
                <strong>구매입찰</strong>
              ) : (
                addComma(data[key as string]) + '원'
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
