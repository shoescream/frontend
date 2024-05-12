import { ElementType } from 'react';
import styled from 'styled-components';

interface ToggleProps {
  isOn: boolean;
  onSetOn: (value: boolean) => void;
  OnIcon: ElementType;
  OffIcon: ElementType;
  size: number;
}

const Toggle = ({ isOn, onSetOn, OnIcon, OffIcon, size }: ToggleProps) => {
  return (
    <>
      {isOn ? (
        <Wrapper onClick={() => onSetOn(false)}>
          <OnIcon size={size} />
        </Wrapper>
      ) : (
        <Wrapper onClick={() => onSetOn(true)}>
          <OffIcon size={size} />
        </Wrapper>
      )}
    </>
  );
};

export default Toggle;

const Wrapper = styled.button`
  background-color: white;
  cursor: pointer;
`;
