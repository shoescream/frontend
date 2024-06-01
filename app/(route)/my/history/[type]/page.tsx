'use client';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import { useProductHistory } from '@/hooks/queries/useHistory';

const buttonProps = [
  { children: '최근 2개월', month: 2 },
  { children: '4개월', month: 4 },
  { children: '6개월', month: 6 },
];

const slotStyleProps: any = {
  textField: {
    size: 'small',
    sx: {
      '& .MuiInputBase-input': {
        height: '2rem',
        fontSize: theme.fontSize.body1,
        fontWeight: 700,
        padding: '0.5rem',
      },
      '& .MuiButtonBase-root': {
        color: 'black',
      },
    },
  },
  popper: {
    sx: {
      '& .MuiPickersDay-root': {
        fontSize: theme.fontSize.caption1,
        fontWeight: 'bold',
      },
      '& .MuiTypography-caption ': {
        fontSize: theme.fontSize.caption1,
        color: 'black',
        fontWeight: 'bold',
        '&:first-child': {
          color: 'red',
        },
        '&:last-child': {
          color: 'blue',
        },
      },
      '& .MuiPickersCalendarHeader-labelContainer': {
        fontSize: theme.fontSize.subtitle3,
      },
    },
  },
};

const MyHistory = (props: any) => {
  const [selectState, setSelectState] = useState([1, 0, 0]);
  const [selectEasyPick, setSelectEasyPick] = useState([1, 0, 0]);
  const day = dayjs();
  const [endDate, setEndDate] = useState(day);
  const [startDate, setStartDate] = useState(day.add(-2, 'month'));
  const type = props.params.type;

  const title = type === 'selling' ? '판매' : '구매';

  const router = useRouter();

  const { data: bidding } = useProductHistory({
    type,
    status: 'bidding',
    startDate: startDate.format('YYYY-DD-MM'),
    endDate: endDate.format('YYYY-DD-MM'),
  });

  const { data: pending } = useProductHistory({
    type,
    status: 'pending',
    startDate: startDate.format('YYYY-DD-MM'),
    endDate: endDate.format('YYYY-DD-MM'),
  });

  const { data: finished } = useProductHistory({
    type,
    status: 'finished',
    startDate: startDate.format('YYYY-DD-MM'),
    endDate: endDate.format('YYYY-DD-MM'),
  });

  const data = [
    { count: bidding?.response.length, title: '입찰' },
    { count: pending?.response.length, title: '진행중' },
    { count: finished?.response.length, title: '완료' },
  ];

  const datePickerValues = [
    { value: startDate, setValue: setStartDate },
    { value: endDate, setValue: setEndDate },
  ];

  const dateHandler = (month: number) => {
    setEndDate(day);
    setStartDate(day.add(-month, 'month'));
    let updateEasyPick = [0, 0, 0];
    updateEasyPick[month / 2 - 1] = 1;
    setSelectEasyPick(updateEasyPick);
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

  const setHistoryList = () => {
    if (selectState[0] === 1) {
      return (
        <>
          {bidding?.response.map((data, idx) => (
            <>
              <ProductInfo key={idx}>
                <img />
                <ProductNameOption>
                  <p id="product_name">{data.productName}</p>
                  <p id="product_option">{data.size}</p>
                </ProductNameOption>
              </ProductInfo>
              <ItemOption>
                <p>{data.price}</p>
                <p>{data.deadLine}</p>
              </ItemOption>
            </>
          ))}
        </>
      );
    } else if (selectState[1] === 1) {
      return (
        <>
          {pending?.response.map((data, idx) => (
            <>
              <ProductInfo key={idx}>
                <img />
                <ProductNameOption>
                  <p id="product_name">{data.productName}</p>
                  <p id="product_option">{data.size}</p>
                </ProductNameOption>
              </ProductInfo>
              <ItemOption>
                <p>{data.status}</p>
              </ItemOption>
            </>
          ))}
        </>
      );
    } else if (selectState[2] === 1) {
      return (
        <>
          {finished?.response.map((data, idx) => (
            <>
              <ProductInfo key={idx}>
                <img />
                <ProductNameOption>
                  <p id="product_name">{data.productName}</p>
                  <p id="product_option">{data.size}</p>
                </ProductNameOption>
              </ProductInfo>
              <ItemOption>
                <p>{data.status}</p>
              </ItemOption>
            </>
          ))}
        </>
      );
    }
  };
  useEffect(() => {
    if (type !== 'selling' && type !== 'buying') {
      alert('로그인 후 이용 가능합니다');
      router.push('/login');
    }
  }, []);
  return (
    <>
      <h2>{title}내역</h2>
      <StateWrapper>
        {data.map((data, idx) => (
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
            <h4>{title + ' ' + data.title}</h4>
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
                  fontSize: theme.fontSize.caption2,
                  color:
                    selectEasyPick[data.month / 2 - 1] === 1
                      ? 'black'
                      : theme.colors.gray[200],
                }}
                key={idx}
                onClick={() => dateHandler(data.month)}
              >
                {data.children}
              </Button>
            ))}
            {datePickerValues.map((date, idx) => (
              <DateItem key={idx}>
                <DatePicker
                  showDaysOutsideCurrentMonth
                  value={date.value}
                  className="date-picker"
                  format="YYYY-MM-DD"
                  slotProps={slotStyleProps}
                  onChange={(newValue) => {
                    date.setValue(dayjs(newValue));
                    setSelectEasyPick([0, 0, 0]);
                  }}
                />
              </DateItem>
            ))}
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
      <ItemBox>{setHistoryList()}</ItemBox>
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
  margin-top: 2.5rem;
  border-bottom: ${(props) => (props.select === 0 ? '0.1rem' : '0.3rem')} solid
    ${(props) => (props.select === 0 ? theme.colors.gray[200] : 'black')};
  cursor: pointer;
  #history_count_select {
    color: ${(props) =>
      props.type === 'selling' ? theme.colors.selling : theme.colors.buying};
  }
  #history_count {
    color: black;
  }
  h4 {
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
  border-bottom: 0.1rem solid ${theme.colors.gray[200]};
`;

const DateWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const DateItem = styled.div`
  width: 15rem;
  margin: 1rem;
  .date-picker {
    background-color: #fff;
    border-radius: 0.4rem;
    div {
      top: 0.25rem;
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
  padding: 1rem 0 0 1rem;
  #product_name {
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  #product_option {
    font-size: ${theme.fontSize.subtitle3};
    color: ${theme.colors.gray[200]};
  }
`;
