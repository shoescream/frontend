'use client';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@/components/common/Button';

const data = {
  selling: [
    { count: 1, title: '입찰' },
    { count: 0, title: '진행중' },
    { count: 2, title: '완료' },
  ],
  buying: [
    { count: 2, title: '입찰' },
    { count: 0, title: '진행중' },
    { count: 1, title: '완료' },
  ],
};

const buttonProps = [
  { children: '최근 2개월', month: 2 },
  { children: '4개월', month: 4 },
  { children: '6개월', month: 6 },
];

const MyHistory = (props: any) => {
  const [selectState, setSelectState] = useState([1, 0, 0]);
  const day = dayjs();
  const [endDate, setEndDate] = useState(day);
  const [startDate, setStartDate] = useState(day.add(-2, 'month'));
  const type = props.params.type;

  const title = type === 'selling' ? '구매' : '판매';

  const historyData = type === 'selling' ? data.selling : data.buying;

  const dateHandler = (month: number) => {
    setEndDate(day);
    setStartDate(day.add(-month, 'month'));
  };

  const stateHandler = (idx: number) => {
    let updateState = [0, 0, 0];
    updateState[idx] = 1;
    setSelectState(updateState);
  };

  const setTitle = () => {
    if (selectState[0] === 1) {
      return (
        <>
          <p>{title} 희망 가격</p>
          <p>만료일</p>
        </>
      );
    } else if (selectState[1] === 1) {
      return (
        <>
          <p>상태</p>
        </>
      );
    } else if (selectState[2] === 1) {
      return (
        <>
          <p>{title} 일</p>
          <p>상태</p>
        </>
      );
    }
  };

  const setOption = () => {
    if (selectState[0] === 1) {
      return (
        <>
          <option>전체</option>
          <option>만료 일</option>
          <option>가격</option>
        </>
      );
    } else if (selectState[1] === 1) {
      return (
        <>
          <option>전체</option>
          <option>상태</option>
        </>
      );
    } else if (selectState[2] === 1) {
      return (
        <>
          <option>전체</option>
          <option>만료 일</option>
          <option>가격</option>
        </>
      );
    }
  };
  return (
    <>
      <h2>{title}내역</h2>
      <StateWrapper>
        {historyData.map((data, idx) => (
          <State
            key={idx}
            onClick={() => stateHandler(idx)}
            select={selectState[idx]}
            type={type}
          >
            <h3
              id={'history_count' + (selectState[idx] === 1 ? '_select' : '')}
            >
              {data.count}
            </h3>
            <h3>{title + ' ' + data.title}</h3>
          </State>
        ))}
      </StateWrapper>
      <SelectDateWrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateWrapper>
            {buttonProps.map((data, idx) => (
              <Button
                size="small"
                buttonColor="light"
                styles={{
                  height: '3rem',
                  marginTop: '1rem',
                  marginRight: '1rem',
                }}
                onClick={() => dateHandler(data.month)}
              >
                {data.children}
              </Button>
            ))}
            <DateItem>
              <DatePicker
                sx={{ backgroundColor: '#fff' }}
                value={startDate}
                className="date-picker"
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
              />
            </DateItem>
            <DateItem>
              <DatePicker
                value={endDate}
                className="date-picker"
                slotProps={{
                  textField: {
                    size: 'small',
                  },
                }}
              />
            </DateItem>
            <Button
              size="small"
              styles={{
                height: '4rem',
                marginTop: '0.55rem',
                fontSize: theme.fontSize.caption1,
              }}
            >
              조회
            </Button>
          </DateWrapper>
        </LocalizationProvider>
      </SelectDateWrapper>
      <StateOptionBox>
        <SortOption>{setOption()}</SortOption>
        <OptionTitle>{setTitle()}</OptionTitle>
      </StateOptionBox>
      <ItemBox>
        <ProductInfo>
          <img />
          <ProductNameOption>
            <p id="product_name">상품 명</p>
            <p id="product_option">상품 옵션</p>
          </ProductNameOption>
        </ProductInfo>
        <ItemOption>{setTitle()}</ItemOption>
      </ItemBox>
    </>
  );
};
export default MyHistory;

const StateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const State = styled.div<{ select: number; type: string }>`
  width: 30rem;
  height: 5rem;
  text-align: center;
  border-bottom: ${(props) => (props.select === 0 ? '0.1rem' : '0.3rem')} solid
    black;
  cursor: pointer;

  #history_count_select {
    color: ${(props) =>
      props.type === 'selling' ? theme.colors.buying : theme.colors.selling};
  }
  #history_count {
    color: black;
  }
  h3 {
    color: ${(props) =>
      props.select === 0 ? theme.colors.gray[200] : 'black'};
  }
`;

const SelectDateWrapper = styled.div`
  width: 90rem;
  height: 10rem;
  background-color: ${theme.colors.gray[100]};
  margin: auto;
  padding-top: 3rem;
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DateItem = styled.div`
  width: 15rem;
  margin: 1rem;
  line-height: 5rem;
  * {
    font-size: ${theme.fontSize.caption1}
    font-weight: bold;
  }
  .date-picker{
    background-color:#fff;
    border-radius:0.4rem;
    div{
        top:0.25rem;
       
    }
  }
`;

const StateOptionBox = styled.div`
  width: 90rem;
  margin: 1rem auto;
  padding: 1rem 1rem 1rem 0;
  border-bottom: 0.1rem solid ${theme.colors.gray[200]};
  display: flex;
  justify-content: space-between;
`;

const OptionTitle = styled.div`
  display: flex;
  p {
    margin: 0 5rem;
    padding-top: 2rem;
  }
`;

const SortOption = styled.select`
  padding: 1rem;
  border: 0.1rem solid ${theme.colors.gray[200]};
  border-radius: 1rem;
  width: 12rem;
  height: 4rem;
  cursor: pointer;
`;

const ItemBox = styled.div`
  width: 90rem;
  margin: 1rem auto;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  border: 0.1rem solid ${theme.colors.gray[200]};
  border-radius: 1rem;
  img {
    width: 8rem;
    height: 8rem;
    float: left;
    margin-right: 1rem;
  }
`;

const ProductInfo = styled.div`
  display: flex;
`;

const ItemOption = styled.div`
  display: flex;
  line-height: 8rem;
  p {
    margin: 0 5rem;
  }
`;

const ProductNameOption = styled.div`
  #product_name {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  #product_option {
    font-size: ${theme.fontSize.subtitle3};
    color: ${theme.colors.gray[200]};
  }
`;
