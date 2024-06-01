import { GLOBAL_SIZES } from '@/constants/globalSizes';
import theme from '../../styles/theme';
import React from 'react';
import styled from 'styled-components';

export type DataItem = {
  index: string;
  US_M: number;
  US_W: number;
  UK: number;
  JP: number;
  EU: number;
};

const GlobalSizes = () => {
  const headers = ['US (M)', 'US (W)', 'UK', 'JP', 'EU'];

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
      <div style={{ marginTop: '1.7rem', position: 'relative' }}>
        <TableContainer>
          <ShoeSizeTableStyled>
            <thead>
              <tr>
                <TableHeader rowSpan={2} style={{ zIndex: 1 }}>
                  KR
                </TableHeader>
                {GLOBAL_SIZES.map((item) => (
                  <TableHeader key={item.index}>{item.index}</TableHeader>
                ))}
              </tr>
            </thead>
            <tbody style={{ position: 'relative' }}>
              {headers.map((header, rowIndex) => (
                <tr key={rowIndex} style={{ position: 'relative' }}>
                  <TableHeader>{header}</TableHeader>
                  {GLOBAL_SIZES.map((item, colIndex) => (
                    <TableCell key={colIndex}>
                      {getValue(item, header)}
                    </TableCell>
                  ))}
                </tr>
              ))}
            </tbody>
          </ShoeSizeTableStyled>
        </TableContainer>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Gradient />
        </div>
      </div>
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
  position: relative;
`;

const ShoeSizeTableStyled = styled.table`
  width: 100%;
  border-collapse: collapse;
  text-align: center;
`;

const TableHeader = styled.th`
  border-bottom: 0.1rem solid #f0f0f0;
  height: 4.8rem;
  min-width: 8rem;
  padding: 1.1rem;
  text-align: center;
  background-color: #fafafa;
  color: ${theme.colors.text.primary};
  font-size: 1.3rem;
  font-weight: 400;
  position: sticky;
  left: 0;
`;

const TableCell = styled.td`
  border-bottom: 0.1rem solid #f0f0f0;
  height: 4.8rem;
  min-width: 8rem;
  padding: 1.1rem;
  text-align: center;
  color: ${theme.colors.text.primary};
  font-size: 1.3rem;
  font-weight: 400;
`;

const Gradient = styled.div`
  background: linear-gradient(270deg, #fff, hsla(0, 0%, 100%, 0));
  height: 28.8rem;
  opacity: 1;
  position: sticky;
  top: 0;
  right: 0;
  width: 8rem;
`;
