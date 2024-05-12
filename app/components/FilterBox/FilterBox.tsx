import theme from '@/styles/theme';
import React from 'react';
import styled from 'styled-components';

interface FilterBoxProps {
  data: string[];
  currentClickedItem: string;
  onClick: (item: string) => void;
}

const FilterBox = ({ data, currentClickedItem, onClick }: FilterBoxProps) => {
  return (
    <Filter>
      {data.map((item) => (
        <FilterItem
          key={item}
          clicked={currentClickedItem === item ? 'true' : 'false'}
          onClick={() => onClick(item)}
          length={data.length}
        >
          {item}
        </FilterItem>
      ))}
    </Filter>
  );
};

export default FilterBox;

const Filter = styled.ul`
  background-color: #f4f4f4;
  border-radius: 1rem;
  display: flex;
  height: 3.6rem;
  width: 100%;
`;

const FilterItem = styled.li<{ clicked?: 'false' | 'true'; length: number }>`
  width: 100%;
  height: 3.2rem;
  margin: 0.2rem;
  font-size: 1.3rem;
  padding: 0.7rem 0.9rem;
  border-radius: 0.8rem;
  cursor: pointer;
  text-align: center;
  color: ${(props) =>
    props.clicked ? theme.colors.main : theme.colors.text.primary};
  background-color: ${(props) => (props.clicked ? 'white' : '#f4f4f4')};
  font-weight: ${(props) => (props.clicked ? 600 : 300)};
  box-shadow: ${(props) =>
    props.clicked ? 'inset 0 0 0 .5px #ebebeb' : 'none'};
`;
