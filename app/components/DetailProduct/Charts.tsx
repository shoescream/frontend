import React, { useState } from 'react';
import FilterBox from '../FilterBox/FilterBox';
import styled from 'styled-components';
import { LineChart } from 'recharts';
import { useGetBid } from '@/hooks/queries/useProduct';

interface ChartsProps {
  productNumber: string;
  size: number;
}

const Charts = ({ productNumber, size }: ChartsProps) => {
  const [currentChartFilter, setCurrentChartFilter] = useState('1개월');
  const { data } = useGetBid({ productNumber, size: String(size) });

  return (
    <div style={{ position: 'relative' }}>
      <FilterBox
        data={['1개월', '3개월', '6개월', '1년']}
        onClick={(item) => setCurrentChartFilter(item)}
        currentClickedItem={currentChartFilter}
      >
        <ChartBox>
          <LineChart />
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
