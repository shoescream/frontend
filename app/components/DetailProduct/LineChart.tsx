import { useGetQuote } from '@/hooks/queries/useProduct';
import React, { useEffect, useState } from 'react';
import {
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import {
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';
import styled from 'styled-components';

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<ValueType, NameType>) => {
  if (active && payload && payload.length) {
    return (
      <ToolTip>
        <p
          style={{
            fontSize: '1.5rem',
            marginBottom: '0.6rem',
            fontWeight: '500',
          }}
        >
          {label}
        </p>
        <p
          style={{ margin: 0, fontSize: '1.4rem' }}
        >{`${payload[0].value?.toLocaleString()}원`}</p>
      </ToolTip>
    );
  }

  return null;
};

interface ChartProps {
  productNumber: string;
  size: string;
  period: number;
}

const Chart = ({ productNumber, size, period }: ChartProps) => {
  const [newData, setNewData] = useState<{ name: string; value: number }[]>([]);
  const { data, isLoading } = useGetQuote({
    productNumber,
    size,
    period,
  });

  useEffect(() => {
    if (data && !isLoading) {
      const updatedData = Object.keys(data).map((key) => ({
        name: key,
        value: data[key],
      }));
      setNewData(updatedData);
    }
  }, [data, isLoading]);

  const values = newData.map((d) => d.value);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);

  const getTicks = (min: number, max: number, numTicks: number) => {
    const step = (max - min) / (numTicks - 1);
    return Array.from({ length: numTicks }, (_, i) => min + i * step);
  };

  const ticks = getTicks(minVal, maxVal, 5);

  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={newData} margin={{ top: 20 }}>
        <XAxis dataKey="name" hide={true} />
        <YAxis
          domain={[0, maxVal]}
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 13 }}
          ticks={[0, ...ticks]}
        />
        <Tooltip cursor={false} content={<CustomTooltip />} />
        <Line
          type="linear"
          dataKey="value"
          stroke="#ff7300"
          dot={false}
          activeDot={{
            r: 5,
            stroke: '#ff7300',
            strokeWidth: 1,
            fill: 'transparent',
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Chart;

const ToolTip = styled.div`
  background-color: rgba(0, 0, 0, 0.65);
  padding: 7px 10px;
  color: white;
  border-radius: 10px;
  border: 0.1rem solid transparent;
  text-align: center;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  position: relative;
`;
