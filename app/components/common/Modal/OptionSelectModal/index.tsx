import theme from '@/styles/theme';
import styled from 'styled-components';

interface MoalProps {
  onClick?: () => void;
}

const OptionSelectModal = ({ onClick }: MoalProps) => {
  return (
    <SelectModalWrapper>
      <ModalHeader>
        <h2>type</h2>
        <h1 id="close__btn" onClick={onClick}>
          X
        </h1>
      </ModalHeader>
      <Content>
        <ItemInfo>
          <ItemImg></ItemImg>
          <Description>
            <h3>title</h3>
            <p>description</p>
          </Description>
        </ItemInfo>
        <ItemOption>
          <Option>
            <div>size</div>
            <div>pay</div>
          </Option>
          <Option>
            <div>size</div>
            <div>pay</div>
          </Option>
          <Option>
            <div>size</div>
            <div>pay</div>
          </Option>
          <Option>
            <div>size</div>
            <div>pay</div>
          </Option>
        </ItemOption>
      </Content>
    </SelectModalWrapper>
  );
};
export default OptionSelectModal;

const SelectModalWrapper = styled.div`
  width: 40rem;
  height: 50rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background-color: #ffffff;
  border-radius: 1rem;
`;

const ModalHeader = styled.div`
  width: 100%;
  padding: 1rem 3rem;
  display: flex;
  position: relative;
  justify-content: space-evenly;
  #close__btn {
    position: absolute;
    right: 1.8rem;
    cursor: pointer;
  }
`;

const Content = styled.div`
  padding: 0 1.5rem;
`;

const ItemInfo = styled.div`
  display: flex;
  padding-bottom: 1.5rem;
  border-bottom: solid 0.1rem ${theme.colors.gray[200]};
`;

const ItemImg = styled.img`
  width: 6rem;
  height: 6rem;
  background-color: #ccc;
  margin: 0 1.5rem;
`;

const Description = styled.div`
  width: 70%;
  padding: 0 1rem;
`;

const ItemOption = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-top: 1.5rem;
  justify-items: center;
  gap: 1rem;
`;

const Option = styled.div`
  width: 100%;
  height: 5.5rem;
  border: 0.1rem solid ${theme.colors.gray[200]};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
