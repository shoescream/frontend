'use client';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large' | 'full';
  buttonTheme?: 'dark' | 'light';
  onClick?: () => void;
  className?: string;
}
const Button = ({
  type = 'button',
  size = 'full',
  buttonTheme = 'dark',
  onClick,
  disabled,
  children,
}: ButtonProps) => {
  const sizeValue = theme.button.common.size[size];
  return (
    <Container
      type={type}
      buttonTheme={buttonTheme}
      onClick={onClick}
      size={sizeValue}
      disabled={disabled}
    >
      {children}
    </Container>
  );
};
const Container = styled.button<{ buttonTheme: string; size: string }>`
  height: 48px;
  border-radius: 10px;
  border: solid 1px ${theme.colors.border};
  font-weight: bold;
  width: ${(props) => props.size};
  color: ${(props) => (props.buttonTheme === 'dark' ? '#ffffff' : '#000000')};
  background-color: ${(props) =>
    props.buttonTheme === 'dark' ? '#000000' : '#ffffff'};
  cursor: pointer;
  &:active {
    background-color: ${(props) =>
      props.buttonTheme === 'dark' ? '#333333' : '#cccccc'};
  }
`;
export default Button;
