import theme from '@/styles/theme';
import React, { PropsWithChildren } from 'react';
import styled, { CSSProperties } from 'styled-components';

interface ModifyButtonProps {
  onClickModify: () => void;
  style?: CSSProperties;
}

const ModifyButton = ({
  children,
  onClickModify,
  style,
}: PropsWithChildren<ModifyButtonProps>) => {
  return (
    <StyledButton onClick={onClickModify} style={style}>
      {children}
    </StyledButton>
  );
};

export default ModifyButton;

const StyledButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 2.2rem;
  z-index: 1;
  height: 3.4rem;
  border: 0.1rem solid ${theme.colors.border};
  color: ${theme.colors.text.primary};
  background-color: white;
  border-radius: 1rem;
  font-size: ${theme.fontSize.caption1};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.3rem;
  cursor: pointer;
`;
