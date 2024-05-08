import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import styled from 'styled-components';

interface TimerProps {
  time: number;
  setTime: Dispatch<SetStateAction<number>>;
}

const Timer = ({ time, setTime }: TimerProps) => {
  const INTERVAL = 1000;
  const minutes = String(Math.floor((time / (1000 * 60)) % 60)).padStart(
    2,
    '0'
  );
  const second = String(Math.floor((time / 1000) % 60)).padStart(2, '0');

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);

    if (time <= 0) {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [time]);

  return (
    <TimerWrapper>
      {minutes} : {second}
    </TimerWrapper>
  );
};
export default Timer;

const TimerWrapper = styled.div`
  position: absolute;
  top: 4.5rem;
  right: 6rem;
`;
