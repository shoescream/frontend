'use client';

/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import SwiperCore from 'swiper';

interface CarouselProps {
  data: string[];
}

const Carousel = ({ data }: CarouselProps) => {
  const [swiper, setSwiper] = useState<SwiperCore>();
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <>
      <Swiper
        style={{
          width: '100%',
          height: '55.1rem',
          backgroundColor: '#ebf0f4',
        }}
        loop={true}
        className="mySwiper"
        onSwiper={setSwiper}
        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex as number)}
      >
        {data?.map((url, index) => {
          return (
            <SwiperSlide key={`${url}-${index}`}>
              <img
                src={url}
                alt={'swiper' + index}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
                referrerPolicy="no-referrer"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Thumbnails>
        {data?.map((item, index) => (
          <ThumbnailItem
            key={`${index}-${item}`}
            onClick={() => swiper?.slideTo(index)}
            style={{
              border:
                currentIndex === index ? '0.1rem solid #22222260' : 'none',
              backgroundColor: '#ebf0f4',
            }}
          >
            <StyledImg src={item} alt={'thumbnail' + index} />
          </ThumbnailItem>
        ))}
      </Thumbnails>
    </>
  );
};

export default Carousel;

const Thumbnails = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 1.6rem 1.6rem;
  margin-top: 2rem;
  height: 6.2rem;
`;

const ThumbnailItem = styled.div`
  width: 6.2rem;
  height: 6.2rem;
  cursor: pointer;
  box-sizing: border-box;
`;

const StyledImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
