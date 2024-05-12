import React from 'react';
import Button from '../common/Button';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface BuyingTableItem {
  size: string;
  price: number;
  date: string;
}

interface BuyingTableProps {
  data: BuyingTableItem[];
}

const BuyingTable = ({ data }: BuyingTableProps) => {
  return (
    <TableWrapper>
      <div style={{ paddingBottom: '1rem' }}>
        <table
          style={{
            display: 'initial',
            tableLayout: 'auto',
            border: '0',
            borderCollapse: 'collapse',
          }}
        >
          <thead>
            <tr>
              <Title>옵션</Title>
              <RightTitle>거래가</RightTitle>
              <LastTitle>거래일</LastTitle>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.size}>
                <SizeData>{item.size}</SizeData>
                <RightSizeData>{item.price}</RightSizeData>
                <LastSizeData>{item.date}</LastSizeData>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        size="full"
        buttonColor="light"
        styles={{
          border: '0.1rem solid #d3d3d3',
          color: theme.colors.text.primary,
          fontSize: '1.4rem',
          fontWeight: '300',
          height: '4rem',
          borderRadius: '1.2rem',
        }}
      >
        체결 내역 더보기
      </Button>
    </TableWrapper>
  );
};

export default BuyingTable;

const TableWrapper = styled.div`
  display: block;
  padding-top: 2.5rem;
`;

const Title = styled.th`
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  width: 50%;
  border-bottom: 0.1rem solid #ebebeb;
  color: ${theme.colors.text.secondary};
  font-size: 1.2rem;
  font-weight: 400;
  padding-bottom: 0.9rem;
  height: 1.4rem;
  text-align: left;
`;

const RightTitle = styled.th`
  text-align: right;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  width: 50%;
  border-bottom: 0.1rem solid #ebebeb;
  color: ${theme.colors.text.secondary};
  font-size: 1.2rem;
  font-weight: 400;
  padding-bottom: 0.9rem;
  height: 1.4rem;
`;

const LastTitle = styled.th`
  flex-basis: 8rem;
  flex-grow: 0;
  flex-shrink: 0;
  min-width: 8rem;
  padding-left: 0;
  padding-right: 0;
  text-align: right;
  border-bottom: 0.1rem solid #ebebeb;
  color: ${theme.colors.text.secondary};
  font-size: 1.2rem;
  font-weight: 400;
  padding-bottom: 0.9rem;
  height: 1.4rem;
`;

const SizeData = styled.td`
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  width: 50%;
  color: ${theme.colors.main};
  font-size: 1.4rem;
  font-weight: 300;
  padding-top: 0.9rem;
  text-align: left;
`;

const RightSizeData = styled.td`
  text-align: right;
  flex-basis: auto;
  flex-grow: 1;
  flex-shrink: 1;
  width: 50%;
  color: ${theme.colors.main};
  font-size: 1.4rem;
  font-weight: 300;
  padding-top: 0.9rem;
`;

const LastSizeData = styled.td`
  flex-basis: 8rem;
  flex-grow: 0;
  flex-shrink: 0;
  min-width: 8rem;
  padding-left: 0;
  padding-right: 0;
  text-align: right;
  color: ${theme.colors.main};
  font-size: 1.4rem;
  font-weight: 300;
  padding-top: 0.9rem;
`;
