'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import ItemBoxWithoutLike from '@/components/ShopPage/ItemBoxWithoutLike';
import axios from 'axios';

interface RankingProduct {
  id: number;
  productCode: string;
  productName: string;
  productSubName: string;
  price: string;
  productImageResponse: {
    productImage: string[];
  };
}

const RankingPage: React.FC = () => {
  const [additionalImagesCounts, setAdditionalImagesCounts] = useState([
    5, 5, 5,
  ]);
  const [rankingData, setRankingData] = useState<RankingProduct[][]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const rankingParamsArray = [
        { gender: 'M', detail: 'SNK', productType: '01' },
        { gender: 'F', detail: 'SNK', productType: '01' },
        { gender: 'M', detail: 'SND', productType: '01' },
      ];

      const responseArray = await Promise.all(
        rankingParamsArray.map((params) =>
          axios.get('http://3.35.24.20:8080/ranking', { params })
        )
      );
      const data = responseArray.map((response) => response.data.result);

      console.log('Fetched ranking data:', data);
      setRankingData(data);
    };
    fetchData();
  }, []);

  const handleShowMoreImages = (index: number) => {
    setAdditionalImagesCounts((prev) =>
      prev.map((value, i) => (i === index ? value + 5 : value))
    );
  };

  return (
    <div>
      {rankingData.map((categoryData, index) => (
        <div key={index}>
          <h3 style={{ margin: '3rem 0 0.5rem 0' }}>
            {index === 0
              ? '남성 스니커즈 인기 순위'
              : index === 1
              ? '여성 스니커즈 인기 순위'
              : '남성 샌들 인기 순위'}
          </h3>
          <p style={{ marginBottom: '3rem', color: 'gray' }}>
            조회, 관심, 거래 급상승(최근 3일)
          </p>
          <ImageContainer>
            {categoryData &&
              categoryData
                .slice(0, additionalImagesCounts[index])
                .map((item, i) => {
                  return (
                    <ItemBoxWithoutLike
                      key={i}
                      branName={item.productName}
                      productName={item.productSubName}
                      price={item.price}
                      productImage={item.productImageResponse.productImage[0]}
                    />
                  );
                })}
          </ImageContainer>
          {additionalImagesCounts[index] < 30 && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '5rem',
              }}
            >
              <Button
                type="button"
                buttonColor="light"
                size="medium"
                onClick={() => handleShowMoreImages(index)}
              >
                더보기
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default RankingPage;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 3rem;
`;
