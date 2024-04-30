'use client';
import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';
import button from '../../../styles/theme';
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large' | 'full';
  theme?: 'dark' | 'light';
  onClick?: () => void;
  className?: string;
}
const Button = ({
  type = 'button',
  size = 'full',
  theme = 'dark',
  onClick,
  disabled,
  children,
}: ButtonProps) => {
  const sizeValue = button.button.common.size[size];

  return (
    <Container
      type={type}
      theme={theme}
      onClick={onClick}
      size={sizeValue}
      disabled={disabled}
    >
      {children}
    </Container>
  );
};
const Container = styled.button<{ theme: string; size: string }>`
  height: 48px;
  border-radius: 10px;
  border: solid 1px rgba(0, 0, 0, 0.2);
  font-weight: bold;
  width: ${(props) => props.size};
  color: ${(props) => (props.theme === 'dark' ? '#ffffff' : '#000000')};
  background-color: ${(props) =>
    props.theme === 'dark' ? '#000000' : '#ffffff'};
  cursor: pointer;
  &:active {
    background-color: ${(props) =>
      props.theme === 'dark' ? '#333333' : '#cccccc'};
  }
`;
export default Button;
