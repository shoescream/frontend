/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import 'swiper/css';
import 'swiper/css/pagination';
import theme from '@/styles/theme';
import { FaCaretDown } from 'react-icons/fa';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { IoBookmark, IoBookmarkOutline } from 'react-icons/io5';
import { MdChevronRight } from 'react-icons/md';

import Button from '@/components/common/Button';
import FilterBox from '@/components/FilterBox/FilterBox';
import Carousel from '@/components/DetailProduct/Carousel';
import Options from '@/components/DetailProduct/Options';
import Toggle from '@/components/common/Toggle';
import BuyingTable from '@/components/DetailProduct/BuyingTable';
import LineChart from '@/components/DetailProduct/LineChart';
import { usePathname, useRouter } from 'next/navigation';
import useAddComma from '@/hooks/useAddComma';
import BySizeModal from '@/components/DetailProduct/BySizeModal';
import SellOrBuySizeModal from '@/components/DetailProduct/SellOrBuySizeModal';
import Review from '@/components/DetailProduct/Review';
import { useDetailProduct } from '@/hooks/queries/useProduct';

const sizeData = [
  {
    size: '220(US W5 M3.5)',
    price: 104000,
    date: '240510',
  },
  {
    size: '225(US W5.5 M4)',
    price: 100000,
    date: '240510',
  },
  {
    size: '230(US W6 M4.5)',
    price: 107000,
    date: '240510',
  },
  {
    size: '235(US W6.5 M5)',
    price: 107000,
    date: '240510',
  },
  {
    size: '240(US W7 M5.5)',
    price: 128000,
    date: '240510',
  },
  {
    size: '245',
    price: 130000,
    date: '240510',
  },
  {
    size: '250',
    price: 134000,
    date: '240510',
  },
  {
    size: '255',
    price: 135000,
    date: '240510',
  },
  {
    size: '260',
    price: 143000,
    date: '240510',
  },
  {
    size: '265',
    price: 139000,
    date: '240510',
  },
  {
    size: '270',
    price: 139000,
    date: '240510',
  },
];

const carouselData = [
  {
    name: '1',
    imageUrl:
      'https://images.unsplash.com/photo-1491553895911-0055eca6402d?q=80&w=3000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    name: '2',
    imageUrl:
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const DetailProduct = () => {
  const router = useRouter();
  const pathname = usePathname();
  const addComma = useAddComma();
  // const isLoggedIn = localStorage.getItem('@token');
  const isLoggedIn = true;
  const [favorite, setFavorite] = useState(false);
  const [saveShop, setSaveShop] = useState(false);
  const [currentChartFilter, setCurrentChartFilter] = useState('전체');
  const [currentFilterBySize, setCurrentFilterBySize] = useState('체결 거래');
  const [currentSizeItem, setCurrentSizeItem] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [isSellingModalOpen, setIsSellingModalOpen] = useState<
    'none' | 'sell' | 'buy'
  >('none');
  const brand = 'nike';
  const id = pathname.replace('/product/', '');
  const { data, isLoading } = useDetailProduct(id);

  useEffect(() => {
    if (isOpen || isSellingModalOpen !== 'none') {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isSellingModalOpen]);

  if (isLoading) {
    return <Container>noting</Container>;
  }

  return (
    <>
      {isOpen && (
        <BySizeModal
          onClose={() => setIsOpen(false)}
          data={sizeData.map(({ date, ...rest }) => rest)}
          currentItem={currentSizeItem}
          onSetCurrentItem={setCurrentSizeItem}
        />
      )}
      {isSellingModalOpen !== 'none' && (
        <SellOrBuySizeModal
          onClose={() => setIsSellingModalOpen('none')}
          data={sizeData.map(({ date, ...rest }) => rest)}
          type={isSellingModalOpen}
        />
      )}
      <Container>
        <LeftBox>
          <LeftInnerBox>
            <CarouselWrapper>
              <Carousel
                data={
                  data?.productResponse.productImageResponse
                    .productImage as string[]
                }
              />
            </CarouselWrapper>
          </LeftInnerBox>
        </LeftBox>
        <div style={{ width: '100%' }}>
          <RightBox>
            <div>
              <div>
                <PriceLabel>즉시 구매가</PriceLabel>
                <Price>{addComma(data?.productResponse.price!)}원</Price>
              </div>
              <FavoriteWrapper>
                <Toggle
                  isOn={favorite}
                  onSetOn={setFavorite}
                  OnIcon={AiFillHeart}
                  OffIcon={AiOutlineHeart}
                  size={28}
                />
              </FavoriteWrapper>
              <NameBox>
                <EngName>
                  {`${data?.productResponse.productName} ${data?.productResponse
                    .productCode!}`}
                </EngName>
                <KorName>{data?.productResponse.productSubName}</KorName>
              </NameBox>
              <SizeButtonBox onClick={() => setIsOpen(true)}>
                <SizeButton>
                  {currentSizeItem > 0 && !isOpen
                    ? sizeData[currentSizeItem].size
                    : '모든 사이즈'}
                  <FaCaretDown />
                </SizeButton>
              </SizeButtonBox>
              <ButtonWrapper>
                <Button
                  buttonColor="buying"
                  styles={{ height: '6rem' }}
                  onClick={() =>
                    isLoggedIn
                      ? setIsSellingModalOpen('buy')
                      : router.push('/login')
                  }
                >
                  <ButtonTextBox>
                    <ButtonSubtitle>즉시 구매가</ButtonSubtitle>
                    <ButtonPrice>{addComma(96000)}원</ButtonPrice>
                    <ButtonSubtitle style={{ width: '4rem' }} />
                  </ButtonTextBox>
                </Button>
                <Button
                  buttonColor="selling"
                  styles={{ height: '6rem' }}
                  onClick={() =>
                    isLoggedIn
                      ? setIsSellingModalOpen('sell')
                      : router.push('/login')
                  }
                >
                  <ButtonTextBox>
                    <ButtonSubtitle>즉시 판매가</ButtonSubtitle>
                    <ButtonPrice>{addComma(96000)}원</ButtonPrice>
                    <ButtonSubtitle style={{ width: '4rem' }} />
                  </ButtonTextBox>
                </Button>
              </ButtonWrapper>
            </div>
            <Options />
            <ShopWrapper>
              <Flex>
                <ShopBox onClick={() => router.push('/brands/' + brand)}>
                  <img
                    src="https://c4.wallpaperflare.com/wallpaper/504/487/806/logos-nike-famous-sports-brand-dark-background-wallpaper-preview.jpg"
                    alt="logo"
                    width={44}
                    height={44}
                    style={{ borderRadius: 100, objectFit: 'cover' }}
                  />
                  <div style={{ marginLeft: '1rem' }}>
                    <ShopText>
                      {data?.productResponse.brandName} <MdChevronRight />
                    </ShopText>
                  </div>
                </ShopBox>
                <Toggle
                  isOn={saveShop}
                  onSetOn={setSaveShop}
                  OnIcon={IoBookmark}
                  OffIcon={IoBookmarkOutline}
                  size={20}
                />
              </Flex>
            </ShopWrapper>
            <div style={{ position: 'relative' }}>
              {!isLoggedIn && (
                <Blur>
                  <BlurBox>
                    <BlurBoxText>
                      {'모든 체결 거래는\n로그인 후 확인 가능합니다.'}
                    </BlurBoxText>
                    <Button
                      size="medium"
                      styles={{ marginTop: '1.2rem' }}
                      onClick={() => router.push('/login')}
                    >
                      <ButtonText>로그인</ButtonText>
                    </Button>
                  </BlurBox>
                </Blur>
              )}
              <DetailTitleBox>
                <DetailTitle>시세</DetailTitle>
              </DetailTitleBox>
              <div style={{ position: 'relative' }}>
                <FilterBox
                  data={['1개월', '3개월', '6개월', '1년', '전체']}
                  onClick={(item) => setCurrentChartFilter(item)}
                  currentClickedItem={currentChartFilter}
                />
                <ChartBox>
                  <LineChart />
                </ChartBox>
              </div>
              <div style={{ marginTop: '2rem' }}>
                <FilterBox
                  data={['체결 거래', '판매 입찰', '구매 입찰']}
                  onClick={(item) => setCurrentFilterBySize(item)}
                  currentClickedItem={currentFilterBySize}
                />
                <BuyingTable data={sizeData} />
              </div>
            </div>
          </RightBox>
        </div>
      </Container>
      <Review></Review>
    </>
  );
};

export default DetailProduct;

const Container = styled.div`
  padding: 4rem;
  height: auto;
  display: flex;
  margin-bottom: 10rem;
  position: relative;
  border-bottom: 0.1rem solid ${theme.colors.gray[100]};
`;

const LeftBox = styled.div``;

const LeftInnerBox = styled.div`
  position: sticky;
  top: 16rem;
  width: 55.1rem;
  overflow-y: hidden;
  float: left;
`;

const CarouselWrapper = styled.div`
  width: 100%;
`;

const RightBox = styled.div`
  padding-left: 4rem;
  border-left: 0.1rem solid #ebf0f4;
  width: 53rem;
  position: relative;
  float: right;
`;

const PriceLabel = styled.p`
  color: ${theme.colors.main};
  font-size: ${theme.fontSize.body1};
  font-weight: 300;
`;

const Price = styled.p`
  margin-top: 0.2rem;
  font-weight: 600;
  font-size: 2.7rem;
  color: ${theme.colors.main};
`;

const NameBox = styled.div`
  margin: 2rem 0;
`;

const EngName = styled.p`
  font-size: 1.8rem;
  font-weight: 300;
  margin-bottom: 0.4rem;
`;

const KorName = styled.p`
  font-size: 1.35rem;
  color: ${theme.colors.text.secondary};
`;

const SizeButtonBox = styled.div`
  padding-bottom: 2rem;
`;

const SizeButton = styled.div`
  padding: 1.2rem;
  border: 0.1rem solid ${theme.colors.gray[100]};
  border-radius: 1rem;
  cursor: pointer;
  width: 100%;
  font-size: 1.5rem;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 1rem;
`;

const ButtonTextBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

const ButtonSubtitle = styled.h3``;

const ButtonPrice = styled.span`
  font-size: 2.3rem;
  font-weight: 700;
  margin-left: 2rem;
`;

const FavoriteWrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`;

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ShopWrapper = styled.div`
  padding: 3rem 0;
`;

const ShopBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
`;

const ShopText = styled.h4`
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const DetailTitleBox = styled.div`
  margin: 4rem 0 2rem;
`;

const DetailTitle = styled.p`
  font-size: 1.8rem;
  font-weight: 600;
`;

const ChartBox = styled.div`
  width: 100%;
  height: 20rem;
`;

const Blur = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: white;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BlurBox = styled.div`
  width: 32rem;
  height: 15rem;
  border: 0.01rem solid ${theme.colors.main};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const BlurBoxText = styled.span`
  white-space: pre-wrap;
  text-align: center;
  color: ${theme.colors.main};
  font-size: 1.4rem;
`;

const ButtonText = styled.span`
  font-size: 1.4rem;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.6rem;
`;
