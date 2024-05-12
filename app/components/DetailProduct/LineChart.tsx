import React from 'react';
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

type ChartData = {
  name: string;
  value: number;
};

const data: ChartData[] = [
  { name: '2024/04/10', value: 1000 },
  { name: '2024/04/11', value: 4000 },
  { name: '2024/04/13', value: 5500 },
  { name: '2024/04/12', value: 1500 },
  { name: '2024/04/14', value: 2000 },
  { name: '2024/04/15', value: 8000 },
  { name: '2024/04/16', value: 5800 },
];

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

const Chart: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data} margin={{ top: 20 }}>
        <XAxis dataKey="name" hide={true} />
        <YAxis
          domain={[0, 'dataMax']}
          orientation="right"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 13 }}
          ticks={[0, 2000, 4000, 6000, 8000]}
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
