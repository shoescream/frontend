import React from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import SidebarItem from './SidebarItem';

const Sidebar = () => {
  const categories = [
    { title: '카테고리', items: ['상의', '신발', '아우터', '하의', '가방'] },
    { title: '브랜드', items: ['Adidas', 'Nike', 'Asics', 'New Balance'] },
    { title: '사이즈', items: ['230', '240', '250', '260', '270'] },
    { title: '성별', items: ['남성', '여성', '키즈'] }
  ];

  return (
    <Aside>
      <FilterContainer> 
        <span className='filter'>필터</span>
        {categories.map((category, index) => (
          <SidebarItem key={index} category={category} index={index} />
        ))}
      </FilterContainer> 
    </Aside>
  );
};

const Aside = styled.aside`
  // SidebarItem에 작성
  width: 20%;
`;

const FilterContainer = styled.div`
  margin: 2rem; 
  border-radius: 3rem; 
  border: 0.1rem solid ${theme.colors.gray[200]} ; 
  text-align: center; 
  padding: 1rem 0; 
  overflow: hidden;
`;


export default Sidebar;
