// SidebarItem.tsx

import React, { useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';

interface CategoryItem {
    title: string;
    items: string[];
}

interface SidebarItemProps {
    category: CategoryItem;
    index: number;
    selectedOptions: string;
    setSelectedOptions: Function;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ category, index, selectedOptions, setSelectedOptions }) => {
    const [expanded, setExpanded] = useState(false);

    const toggleItem = () => {
        setExpanded(prevExpanded => !prevExpanded);

        // 선택된 카테고리를 업데이트
        setSelectedOptions((prevState: string) => prevState === category.title ? '' : category.title);
    };

    return (
        <Wrapper>
            <Categories onClick={toggleItem}>
                <ItemTitle>{category.title}</ItemTitle>
                <ToggleIcon src={expanded ? '/sidebarminus.png' : '/sidebarplus.png'} alt="Toggle Icon" />
            </Categories>
            <ItemList className={expanded ? 'expanded' : ''}>
                {category.items.map((item, idx) => (
                    <ItemOption key={idx}>
                        <input type="checkbox" id={`item-${index}-${idx}`} />
                        <StyledLabel htmlFor={`item-${index}-${idx}`}>{item}</StyledLabel>
                    </ItemOption>
                ))}
            </ItemList>
        </Wrapper>
    );
};

export default SidebarItem;

const Wrapper = styled.div`
    margin-top: 2rem;
    border-bottom: 0.1rem solid ${theme.colors.gray[200]}; 
`;

const Categories = styled.div`
  display: flex;
  justify-content: space-between;
  cursor: pointer;
  margin: 1rem;

`;

const ItemTitle = styled.span`
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const ToggleIcon = styled.img`
  width: 2rem;
  height: 2rem;
`;

const ItemList = styled.ul`
  list-style: none;
  margin: 1rem;
  padding: 0;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  text-align: left;

  &.expanded {
    max-height: 100rem;
  }
`;

const ItemOption = styled.li`
  cursor: pointer;
  margin-bottom: 0.5rem;
  color: gray;
`;

const StyledLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  margin-left: 0.5rem;
`;