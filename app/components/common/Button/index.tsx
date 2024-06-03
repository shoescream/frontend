import { ButtonHTMLAttributes, CSSProperties } from 'react';
import styled from 'styled-components';
import theme from '../../../styles/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'full';
  buttonColor?: 'dark' | 'light' | 'selling' | 'buying' | 'none';
  onClick?: () => void;
  className?: string;
  hasPrice?: string;
  styles?: CSSProperties;
  customFontSize?: string;
}

const Button = ({
  type = 'button',
  size = 'full',
  buttonColor = 'dark',
  hasPrice,
  onClick,
  disabled = false,
  children,
  styles,
  customFontSize,
}: ButtonProps) => {
  const sizeValue = theme.button.size[size];
  const buttonColorValue = disabled
    ? theme.colors.gray[200]
    : buttonColor === 'none'
    ? 'transparent'
    : theme.button.color[buttonColor];
  const fontSize = () => {
    if (hasPrice) {
      return '0.8rem';
    } else if (customFontSize) {
      return customFontSize;
    }
    return theme.fontSize.caption3;
  };

  return (
    <Container
      type={type}
      $buttonColor={buttonColorValue}
      onClick={onClick}
      disabled={disabled}
      $fontSize={fontSize()}
      $size={sizeValue}
      style={{
        ...styles,
        width: sizeValue,
        backgroundColor: buttonColorValue,
        color: buttonColor === 'none' ? theme.colors.text.primary : 'white',
        fontWeight: buttonColor === 'none' ? 400 : 'bold',
      }}
    >
      {children}
      {hasPrice && <div className="price">{hasPrice}</div>}
    </Container>
  );
};

const Container = styled.button<{
  $buttonColor: string;
  $size: string;
  $fontSize: string;
  disabled: boolean;
}>`
  height: 4.8rem;
  border-radius: 1rem;
  border: solid 0.1rem ${theme.colors.border};
  font-size: ${(props) => props.$fontSize};
  color: ${(props) =>
    props.$buttonColor === '#ffffff' ? '#000000' : '#ffffff'};
  margin-top: 1rem;
  cursor: ${(props) => (props.disabled ? 'default' : 'pointer')};
  &:active {
    background-color: ${(props) =>
      props.$buttonColor === '#000000' ? '#333333' : ''};
  }
  .price {
    font-size: ${theme.fontSize.caption1};
    margin-top: 0.3rem;
  }
`;

export default Button;
