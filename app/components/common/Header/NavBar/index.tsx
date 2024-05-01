'use client';
import theme from '@/styles/theme';
import styled from 'styled-components';

interface NavDataProps {
  title?: string;
  event?: () => void;
}
interface NavProps {
  type?: 'top' | 'main';
  data?: NavDataProps[];
}
const MultiNavBar = ({ type = 'top', data }: NavProps) => {
  return (
    <NavWrapper type={type}>
      {data &&
        data.map((navData, idx) => (
          <ButtonWrapper onClick={navData.event} key={idx} type={type}>
            {navData.title}
          </ButtonWrapper>
        ))}
    </NavWrapper>
  );
};
const NavWrapper = styled.nav<{ type: string }>`
  height: ${(props) => (props.type === 'top' ? '15px' : '42.5px')};
  font-size: ${(props) =>
    props.type === 'top' ? theme.fontSize.caption3 : theme.fontSize.title2};
  position: ${(props) => (props.type === 'top' ? 'absolute' : 'static')};
  top: 0;
  right: 0;
`;
const ButtonWrapper = styled.button<{ type: string }>`
  width: ${(props) => (props.type === 'top' ? '70px' : '100px')};
  margin: 0 10px 0 5px;
  background-color: #ffffff;
  line-height: ${(props) => (props.type === 'top' ? '' : '42.5px')};
`;
export default MultiNavBar;
