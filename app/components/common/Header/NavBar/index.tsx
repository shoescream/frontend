import styled from 'styled-components';

interface NavDataProps {
  title?: string;
  event?: () => void;
}
interface NavProps {
  type?: 'top' | 'main';
  data?: NavDataProps[];
}
const MultiNavBar = ({ type = 'top' }: NavProps) => {
  return <NavWrapper type={type}></NavWrapper>;
};
const NavWrapper = styled.div<{ type: string }>`
    height : ${(props) => (props.type === 'top' ? '15px' : '40px')};
    border : solid 1px black;
    font-size
`;
export default MultiNavBar;
