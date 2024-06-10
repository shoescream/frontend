import theme from '@/styles/theme';
import styled from 'styled-components';

interface StateBoxProps {
  data: { count: number; title: string }[];
  stateHandler: (idx: number) => void;
  selectState: number[];
  type: string;
  title: string;
}
const StateBox = ({
  data,
  stateHandler,
  selectState,
  type,
  title,
}: StateBoxProps) => {
  return (
    <StateWrapper>
      {data.map((data, idx) => (
        <State
          key={data.title}
          onClick={() => stateHandler(idx)}
          select={selectState[idx]}
          type={type}
        >
          <h3 id={'history_count' + (selectState[idx] === 1 ? '_select' : '')}>
            {data.count ? data.count : 0}
          </h3>
          <h4>{title + ' ' + data.title}</h4>
        </State>
      ))}
    </StateWrapper>
  );
};

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
export default StateBox;
