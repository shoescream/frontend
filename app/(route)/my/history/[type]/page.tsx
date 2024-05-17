'use client';
import theme from '@/styles/theme';
import { useState } from 'react';
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
  return (
    <>
      <h2>{title}내역</h2>
      <StateWrapper>
        {historyData.map((data, idx) => (
          <State
            key={idx}
            onClick={() => stateHandler(idx)}
            select={selectState[idx]}
          >
            <h3>{data.count}</h3>
            <h3>{title + ' ' + data.title}</h3>
          </State>
        ))}
      </StateWrapper>
      <SelectDateWrapper>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateWrapper>
            <Button
              size="small"
              buttonColor="light"
              styles={{
                height: '3rem',
                marginTop: '1rem',
                marginRight: '1rem',
              }}
              onClick={() => dateHandler(2)}
            >
              최근 2개월
            </Button>
            <Button
              size="small"
              buttonColor="light"
              styles={{
                height: '3rem',
                marginTop: '1rem',
                marginRight: '1rem',
              }}
              onClick={() => dateHandler(4)}
            >
              4개월
            </Button>
            <Button
              size="small"
              buttonColor="light"
              styles={{
                height: '3rem',
                marginTop: '1rem',
                marginRight: '1rem',
              }}
              onClick={() => dateHandler(6)}
            >
              6개월
            </Button>
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
    </>
  );
};
export default MyHistory;

const StateWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const State = styled.div<{ select: number }>`
  width: 30rem;
  height: 5rem;
  text-align: center;
  border-bottom: ${(props) => (props.select === 0 ? '0.1rem' : '0.3rem')} solid
    black;
  cursor: pointer;
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
