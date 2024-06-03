import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import styled from 'styled-components';
import theme from '@/styles/theme';
import Button from '../common/Button';
import { Dispatch, SetStateAction } from 'react';

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
        '&:first-of-type': {
          color: 'red',
        },
        '&:last-of-type': {
          color: 'blue',
        },
      },
      '& .MuiPickersCalendarHeader-labelContainer': {
        fontSize: theme.fontSize.subtitle3,
      },
    },
  },
};

interface SelectDateProps {
  selectEasyPick: number[];
  dateHandler: (month: number) => void;
  datePickerValues: {
    start: dayjs.Dayjs;
    end: dayjs.Dayjs;
    setStart: Dispatch<SetStateAction<dayjs.Dayjs>>;
    setEnd: Dispatch<SetStateAction<dayjs.Dayjs>>;
  };
  unEasyPick: () => void;
  reFetchHandler: () => void;
}

const SelectDate = ({
  selectEasyPick,
  dateHandler,
  datePickerValues,
  unEasyPick,
  reFetchHandler,
}: SelectDateProps) => {
  return (
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

          <DateItem>
            <DatePicker
              showDaysOutsideCurrentMonth
              value={datePickerValues.start}
              className="date-picker"
              format="YYYY-MM-DD"
              slotProps={slotStyleProps}
              onChange={(newValue) => {
                datePickerValues.setStart(dayjs(newValue));
                unEasyPick();
              }}
            />
          </DateItem>
          <DateItem>
            <DatePicker
              showDaysOutsideCurrentMonth
              value={datePickerValues.end}
              className="date-picker"
              format="YYYY-MM-DD"
              slotProps={slotStyleProps}
              onChange={(newValue) => {
                datePickerValues.setEnd(dayjs(newValue));
                unEasyPick();
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
            onClick={reFetchHandler}
          >
            조회
          </Button>
        </DateWrapper>
      </LocalizationProvider>
    </SelectDateWrapper>
  );
};

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

export default SelectDate;
