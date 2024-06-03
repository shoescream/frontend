'use client';

import theme from '@/styles/theme';
import styled, { CSSProperties } from 'styled-components';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps extends Pick<HTMLInputElement, 'type' | 'name'> {
  label?: string;
  register: UseFormRegister<any>;
  rules?: RegisterOptions;
  errormessage: string;
  placeholder?: string;
  styles?: CSSProperties;
  readonly?: boolean;
  isFromMypage?: boolean;
}

const Input = ({
  label,
  type,
  name,
  register,
  rules,
  errormessage,
  placeholder,
  styles,
  readonly = false,
  isFromMypage = false,
}: InputProps) => {
  const labelColor = () => {
    if (errormessage) {
      return '#f15746';
    } else if (isFromMypage) {
      return theme.colors.text.secondary;
    }
    return theme.colors.main;
  };

  return (
    <InputWrapper style={styles}>
      <Label $color={labelColor()} $fontWeight={isFromMypage ? 400 : 600}>
        {label}
      </Label>
      <StyledInput
        type={type}
        {...register(name, rules)}
        errormessage={errormessage}
        placeholder={placeholder}
        readOnly={readonly}
      />
      {errormessage && <ErrorText>{errormessage}</ErrorText>}
    </InputWrapper>
  );
};

Input.displayName = 'Input';

export default Input;

const InputWrapper = styled.div`
  padding: 1rem 0 1.4rem;
  position: relative;
  height: 8rem;
  margin: 0 auto;
`;

const Label = styled.label<{ $color: string; $fontWeight: number }>`
  font-size: ${theme.fontSize.body2};
  line-height: 1.8rem;
  color: ${(props) => props.$color};
  font-weight: ${(props) => props.$fontWeight};
`;

const StyledInput = styled.input<Pick<InputProps, 'errormessage'>>`
  border-bottom: 0.1rem solid
    ${(props) => (props.errormessage ? '#f15746' : theme.colors.border)};
  border-top: 0;
  border-left: 0;
  border-right: 0;
  height: 3.8rem;
  width: 100%;
  outline: none;
  font-size: ${theme.fontSize.subtitle3};
  color: ${theme.colors.main};
  padding-bottom: 1.4rem;
  padding-top: 1.4rem;
  margin-top: 0.4rem;
  cursor: ${(props) => (props.readOnly ? 'default' : 'text')};
  &::placeholder {
    color: #bcbcbc;
  }
  &:focus {
    border-bottom-width: ${(props) =>
      props.errormessage || props.readOnly ? '0.1rem' : '0.2rem'};
    border-bottom-color: ${(props) =>
      props.readOnly
        ? theme.colors.border
        : props.errormessage
        ? '#f15746'
        : theme.colors.main};
    &::placeholder {
      color: white;
    }
  }
`;

const ErrorText = styled.p`
  color: #f15746;
  font-size: ${theme.fontSize.caption2};
  line-height: 1.6rem;
  margin-top: 0.2rem;
`;
