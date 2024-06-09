'use client';
import theme from '@/styles/theme';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useProductHistory } from '@/hooks/queries/useHistory';
import StateBox from '@/components/History/State';
import SelectDate from '@/components/History/SelectDate';
import SetHistoryList from '@/components/History/setHistoryList';

const MyHistory = (props: any) => {
  const [selectState, setSelectState] = useState([1, 0, 0]);
  const [selectEasyPick, setSelectEasyPick] = useState([1, 0, 0]);
  const day = dayjs();
  const [endDate, setEndDate] = useState(day);
  const [startDate, setStartDate] = useState(day.add(-2, 'month'));
  const [sortOption, setSortOption] = useState('날짜 빠른 순');
  const type = props.params.type;

  const title = type === 'selling' ? '판매' : '구매';

  const router = useRouter();
  const fetchProductHistory = (status: 'bidding' | 'pending' | 'finished') => {
    return useProductHistory({
      type,
      status,
      startDate: startDate.format('YYYY-MM-DD'),
      endDate: endDate.format('YYYY-MM-DD'),
    });
  };

  const { data: bidding, refetch: bidRe } = useProductHistory({
    type,
    status: 'bidding',
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
  });
  const { data: pending, refetch: pendRe } = useProductHistory({
    type,
    status: 'pending',
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
  });
  const { data: finished, refetch: finiRe } = useProductHistory({
    type,
    status: 'finished',
    startDate: startDate.format('YYYY-MM-DD'),
    endDate: endDate.format('YYYY-MM-DD'),
  });

  const data = [
    { count: bidding ? bidding.result.length : 0, title: '입찰' },
    { count: pending ? pending.result.length : 0, title: '진행중' },
    { count: finished ? finished.result.length : 0, title: '완료' },
  ];

  const datePickerValues = {
    start: startDate,
    end: endDate,
    setStart: setStartDate,
    setEnd: setEndDate,
  };

  const unEasyPick = () => {
    setSelectEasyPick([0, 0, 0]);
  };
  const reFetchHandler = () => {
    bidRe();
    pendRe();
    finiRe();
  };
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
          <p>{title} 예정일</p>
        </>
      );
    } else if (selectState[2] === 1) {
      return (
        <>
          <p>상태</p>
          <p>{title}일</p>
        </>
      );
    }
  };

  const setOption = () => {
    if (selectState[0] === 1) {
      return (
        <>
          <option value="날짜 빠른 순">날짜 빠른 순</option>
          <option value="날짜 느린 순">날짜 느린 순</option>
          <option value="가격 높은 순">가격 높은 순</option>
          <option value="가격 낮은 순">가격 낮은 순</option>
        </>
      );
    } else if (selectState[1] === 1) {
      return (
        <>
          <option value="날짜 빠른 순">날짜 빠른 순</option>
          <option value="날짜 느린 순">날짜 느린 순</option>
        </>
      );
    } else if (selectState[2] === 1) {
      return (
        <>
          <option value="날짜 빠른 순">날짜 빠른 순</option>
          <option value="날짜 느린 순">날짜 느린 순</option>
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
  if (!bidding || !pending || !finished) return <div>loading...</div>;
  return (
    <>
      <h2>{title}내역</h2>
      <StateBox
        title={title}
        stateHandler={stateHandler}
        selectState={selectState}
        type={type}
        data={data}
      />
      <SelectDate
        selectEasyPick={selectEasyPick}
        dateHandler={dateHandler}
        datePickerValues={datePickerValues}
        unEasyPick={unEasyPick}
        reFetchHandler={reFetchHandler}
      />
      <StateOptionBox>
        <SortOption
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          {setOption()}
        </SortOption>
        <OptionTitle>{setTitle()}</OptionTitle>
      </StateOptionBox>
      <SetHistoryList
        selectState={selectState}
        bidding={bidding.result}
        pending={pending.result}
        finished={finished.result}
      />
    </>
  );
};
export default MyHistory;

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
    width: 15rem;
    text-align: center;
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
