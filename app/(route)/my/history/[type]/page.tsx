'use client';
import theme from '@/styles/theme';
import { useState } from 'react';
import styled from 'styled-components';

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

  const type = props.params.type;

  const title = type === 'selling' ? '구매' : '판매';

  const historyData = type === 'selling' ? data.selling : data.buying;

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
  border-bottom: ${(props) => (props.select === 0 ? '0.1rem' : '0.5rem')} solid
    ${theme.colors.gray[600]};
`;
