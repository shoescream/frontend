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
}: //   ...props
ButtonProps) => {
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
  height: 50px;
  border-radius: ;
  width: ${(props) => props.size};
`;
export default Button;
