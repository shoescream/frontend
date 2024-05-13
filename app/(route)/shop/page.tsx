'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import ItemBox from '../../components/ShopPage/Itembox';
import Sidebar from '@/components/ShopPage/Sidebar';

const ShopPage = () => {

    return (
        <Container>
            <Sidebar />
            <MainContent>
                {/* 검색된 상품 개수 표시 */}
                <ProductCount>검색된 상품 개수 n개</ProductCount>
                {/* 메인 콘텐츠 영역 */}
                <ItemContainer>
                    <ItemBox/>
                    <ItemBox/>
                    <ItemBox/>
                    <ItemBox/>
                    <ItemBox/>
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
    padding: 0 2rem; /* 좌우 여백 조정 */
`;