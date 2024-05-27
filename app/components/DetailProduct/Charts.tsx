import React, { useState } from 'react';
import FilterBox from '../FilterBox/FilterBox';
import styled from 'styled-components';
import Chart from './LineChart';

interface ChartsProps {
  productNumber: string;
  size: number;
}

const Charts = ({ productNumber, size }: ChartsProps) => {
  const [currentChartFilter, setCurrentChartFilter] = useState('1개월');

  return (
    <div style={{ position: 'relative' }}>
      <FilterBox
        data={['1개월', '3개월', '6개월', '1년']}
        onClick={(item) => setCurrentChartFilter(item)}
        currentClickedItem={currentChartFilter}
      >
        <ChartBox>
          <Chart
            productNumber={productNumber}
            size={size ? String(size) : 'allSize'}
            period={
              currentChartFilter === '1년' ? 12 : Number(currentChartFilter[0])
            }
          />
        </ChartBox>
      </FilterBox>
    </div>
  );
};

export default Charts;

const ChartBox = styled.div`
  width: 100%;
  height: 20rem;
`;
