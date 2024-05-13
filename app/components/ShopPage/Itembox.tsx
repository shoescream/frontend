'use client';

import React, { useState } from 'react';
import styled from 'styled-components';

const ItemBox = () => {
    // 좋아요 상태 관리
    const [liked, setLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);

    const handleLikeClick = () => {
        setLiked(!liked);
        setLikeCount((prevCount) => (liked ? prevCount - 1 : prevCount + 1)); // 좋아요 개수 증감
    };

    return (
        <ImageItem>
            <div className='item-box'>
                <div className='img'></div> {/* 이미지 들어갈 공간 */}
                <strong className='brand'>브랜드명</strong>
                <p className='product-name'>상품명</p>
                <p className='price' style={{ marginTop: '2rem' }}>가격</p>
                <div className='like'>
                    <button onClick={handleLikeClick}>{liked ? '🖤' : '🤍'}</button>
                    <span>{likeCount}</span>
                </div>
            </div>
        </ImageItem>
    );
};

export default ItemBox;

const ImageItem = styled.div`
    width: calc(25% - 1rem); 
    border-radius: 1rem;
    overflow: hidden;
    margin-bottom: 2rem; 

    .item-box {
        position: relative;
        overflow: hidden;
        background-color: white;
    }

    .img {
        border-radius: 1rem;
        height: 0;
        margin-bottom: 1rem;
        padding-top: 100%;
        background-color: whitesmoke; 
    }

    .brand,
    .product-name,
    .price {
        margin: 0.5rem;
    }
  
    .like {
        display: flex;
        margin-top: 1rem;
        margin-bottom: 3rem;
        button {
            margin-left: 0.3rem;
            background: none;
            border: none;
            cursor: pointer;
            font-size: 1.5rem;
        }
        span {
            margin-left: 0.5rem;
        }
    }
`;