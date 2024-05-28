import theme from '../../styles/theme';
import React from 'react';
import styled from 'styled-components';

type DataItem = {
  index: string;
  US_M: number;
  US_W: number;
  UK: number;
  JP: number;
  EU: number;
};

const GlobalSizes = () => {
  const headers = ['US (M)', 'US (W)', 'UK', 'JP', 'EU'];
  const data: DataItem[] = [
    { index: '225', US_M: 3.5, US_W: 5, UK: 3, JP: 22.5, EU: 35.5 },
    { index: '230', US_M: 4, US_W: 5.5, UK: 3.5, JP: 23, EU: 36 },
    { index: '235', US_M: 4.5, US_W: 6, UK: 4, JP: 23.5, EU: 36.5 },
    { index: '240', US_M: 5, US_W: 6.5, UK: 4.5, JP: 24, EU: 37.5 },
    { index: '245', US_M: 5.5, US_W: 7, UK: 5, JP: 24, EU: 38 },
    {
      index: '250',
      US_M: 6,
      US_W: 7.5,
      UK: 5.5,
      JP: 24.5,
      EU: 38.5,
    },
    { index: '255', US_M: 7, US_W: 8, UK: 6, JP: 25, EU: 39 },
    {
      index: '260',
      US_M: 7.5,
      US_W: 8.5,
      UK: 6.5,
      JP: 25.5,
      EU: 40,
    },
    { index: '265', US_M: 8, US_W: 9, UK: 7, JP: 26, EU: 40.5 },
    {
      index: '270',
      US_M: 8.5,
      US_W: 9.5,
      UK: 7.5,
      JP: 26.5,
      EU: 41,
    },
    { index: '275', US_M: 9, US_W: 10, UK: 8, JP: 27, EU: 42 },
    {
      index: '280',
      US_M: 9.5,
      US_W: 10.5,
      UK: 8.5,
      JP: 27.5,
      EU: 42.5,
    },
    { index: '285', US_M: 10, US_W: 11, UK: 9, JP: 28, EU: 43 },
    {
      index: '290',
      US_M: 10.5,
      US_W: 11.5,
      UK: 9.5,
      JP: 28.5,
      EU: 44,
    },
  ];

  const getValue = (item: DataItem, header: string) => {
    switch (header) {
      case 'US (M)':
        return item.US_M;
      case 'US (W)':
        return item.US_W;
      case 'UK':
        return item.UK;
      case 'JP':
        return item.JP;
      case 'EU':
        return item.EU;
      default:
        return '';
    }
  };

  return (
    <Box>
      <p style={{ fontSize: '2rem', fontWeight: '600' }}>사이즈 정보</p>
      <TableContainer>
        <ShoeSizeTableStyled>
          <thead>
            <tr>
              <TableHeader rowSpan={2}>KR</TableHeader>
              {data.map((item) => (
                <TableHeader key={item.index}>{item.index}</TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {headers.map((header, rowIndex) => (
              <tr key={rowIndex}>
                <TableHeader>{header}</TableHeader>
                {data.map((item, colIndex) => (
                  <TableCell key={colIndex}>{getValue(item, header)}</TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </ShoeSizeTableStyled>
      </TableContainer>
    </Box>
  );
};

export default GlobalSizes;

const Box = styled.div`
  padding-bottom: 4rem;
  border-bottom: 0.1rem solid ${theme.colors.gray[100]};
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-top: 1.7rem;
`;

const ShoeSizeTableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const TableHeader = styled.th`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
`;

const TableCell = styled.td`
  padding: 8px 12px;
  border: 1px solid #ddd;
`;
