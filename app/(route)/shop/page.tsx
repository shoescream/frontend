'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import Sidebar from '@/components/ShopPage/Sidebar';
import ItemBox from '@/components/ShopPage/ItemBox';
import useAddComma from '@/hooks/useAddComma';
import {
  useShopProducts,
  ShopProductType,
} from '@/hooks/queries/useShopProducts';

const ShopPage = () => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const addComma = useAddComma();
  
  const { data: products = [] } = useShopProducts();

  const onSetSelectedOptions = (option: string) => {
    setSelectedOptions((prev) => {
      if (prev.includes(option)) {
        return prev.filter((item) => item !== option);
      } else {
        return [...prev, option];
      }
    });
  };

  // 필터링 로직
  const filterProducts = (products: ShopProductType[]) => {
    return products.filter((product) => {
      // 성별 필터링
      const genderOptions = selectedOptions.filter(
        (option) => option === '남성' || option === '여성'
      );
      const genderMatch =
        genderOptions.length === 0 ||
        genderOptions.some((option) => {
          if (option === '남성') {
            return product.productCode.charAt(0) !== 'W';
          } else if (option === '여성') {
            return product.productCode.charAt(0) === 'W';
          }
          return false;
        });

      // 브랜드 필터링
      const brandOptions = selectedOptions.filter(
        (option) => !['남성', '여성'].includes(option)
      );
      const branddMatch =
        brandOptions.length === 0 || brandOptions.includes(product.brandName);

      // return genderMatch;
      return genderMatch && branddMatch;
    });
  };

  const filteredProducts = filterProducts(products);

  return (
    <Container>
      <Sidebar
        selectedOptions={selectedOptions}
        onSetSelectedOptions={onSetSelectedOptions}
        products={products}
      />
      <MainContent>
        <ProductCount>
          검색된 상품 개수 {filteredProducts.length}개
        </ProductCount>
        <ItemContainer>
          {filteredProducts.map((product, index) => (
            <ItemBox
              key={index}
              product={{
                ...product,
                price: (product.price),
              }}
              showLikeButton
              pageType={'shop'}
            />
          ))}
        </ItemContainer>
      </MainContent>
    </Container>
  );
};

export default ShopPage;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 128rem;
`;

const MainContent = styled.div`
  flex: 1;
`;

const ProductCount = styled.div`
  margin: 1rem 0 2rem 2rem;
  color: gray;
`;

const ItemContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 0 2rem;
`;
