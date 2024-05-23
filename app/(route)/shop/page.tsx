'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import ItemBoxWithLike from '@/components/ShopPage/ItemBoxWithLike';
import Sidebar from '@/components/ShopPage/Sidebar';
import { ShopProductType } from './shopProduct';


const ShopPage = () => {
    // 상태 관리
    const [selectedOptions, setSelectedOptions] = useState<string>('');

    // 상품 필터링 함수
    const filterProducts = (products: ShopProductType[]) => {
        // 필터링 로직 구현
        return products; // 예시로 임시로 반환
    };

    return (
        <Container>
            <Sidebar selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} />
            <MainContent>
                {/* 검색된 상품 개수 표시 */}
                <ProductCount>검색된 상품 개수 n개</ProductCount>
                {/* 메인 콘텐츠 영역 */}
                <ItemContainer>
                    {/* 필터링된 상품만 표시 */}
                    {filterProducts([]).map((product, index) => (
                        <ItemBoxWithLike key={index} product={product} />
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
    justify-content: space-between;
    padding: 0 2rem; 
`;