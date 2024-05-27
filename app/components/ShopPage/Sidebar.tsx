import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import theme from '@/styles/theme';
import SidebarItem from './SidebarItem';
import { ShopProductType } from 'app/(route)/shop/shopProduct';

interface SidebarProps {
  selectedOptions: string[];
  onSetSelectedOptions: (option: string) => void; 
  products: ShopProductType[];
}

const Sidebar: React.FC<SidebarProps> = ({ selectedOptions, onSetSelectedOptions, products }) => {
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    const uniqueBrands = Array.from(new Set(products.map(product => product.brandName))); // 중복 제거
    console.log('브랜드 데이터:', uniqueBrands);
    setBrands(uniqueBrands);
  }, [products]);

  const categories = [
    { title: '카테고리', items: ['상의', '신발', '아우터', '하의', '가방'] },
    { title: '브랜드', items: brands },
    { title: '사이즈', items: ['230', '240', '250', '260', '270'] },
    { title: '성별', items: ['남성', '여성'] }
  ];

  return (
    <Aside>
      <FilterContainer>
        <span className='filter'>필터</span>
        {categories.map((category, index) => (
          <SidebarItem
            key={index}
            category={category}
            index={index}
            selectedOptions={selectedOptions}
            onSetSelectedOptions={onSetSelectedOptions} 
          />
        ))}
      </FilterContainer>
    </Aside>
  );
};

export default Sidebar;

const Aside = styled.aside`
    width: 20%;
`;

const FilterContainer = styled.div`
    margin: 2rem;
    border-radius: 3rem;
    border: 0.1rem solid ${theme.colors.gray[200]};
    text-align: center;
    padding: 1rem 0;
    overflow: hidden;
`;
