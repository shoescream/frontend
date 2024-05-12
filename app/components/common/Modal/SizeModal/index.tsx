import styled from 'styled-components';
import { IoCloseOutline } from 'react-icons/io5';
import theme from '@/styles/theme';
import { useState } from 'react';
import useAddComma from '@/hooks/useAddComma';

interface MoalProps {
  onClose?: () => void;
  data: {
    size: string;
    price: number;
  }[];
}

const SizeModal = ({ onClose, data }: MoalProps) => {
  const addComma = useAddComma();
  const [clickedItem, setClickedItem] = useState(0);

  return (
    <Blur>
      <Content>
        <Header>
          <div />
          <h1 style={{ fontSize: '2rem' }}>사이즈</h1>
          <IoCloseOutline
            size={24}
            style={{ cursor: 'pointer' }}
            onClick={onClose}
          />
        </Header>
        <div>
          <Grid>
            {data.map((item, index) => (
              <GridItem
                key={index}
                $clicked={clickedItem === index}
                onClick={() => setClickedItem(index)}
              >
                <GridItemTitle>
                  {index === 0 ? <strong>모든 사이즈</strong> : item.size}
                </GridItemTitle>
                <GridItemPrice $isFirstItem={index > 0}>
                  {index === 0 ? (
                    <strong>구매입찰</strong>
                  ) : (
                    addComma(item.price) + '원'
                  )}
                </GridItemPrice>
              </GridItem>
            ))}
          </Grid>
        </div>
      </Content>
    </Blur>
  );
};
export default SizeModal;

const Blur = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #22222290;
  position: absolute;
  z-index: 4;
`;

const Content = styled.div`
  width: 48rem;
  height: 51.4rem;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 20%;
  left: 30%;
  z-index: 2;
  background-color: white;
  overflow: scroll;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.6rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 0.8rem;
  row-gap: 0.8rem;
  margin-top: 1rem;
  margin-bottom: 3.2rem;
  padding: 0 3.2rem;
`;

const GridItem = styled.div<{ $clicked: boolean }>`
  height: 6rem;
  width: 100%;
  border-radius: 1rem;
  border: 0.1rem solid
    ${({ $clicked }) => ($clicked ? theme.colors.main : theme.colors.border)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const GridItemTitle = styled.p`
  font-size: 1.4rem;
`;

const GridItemPrice = styled.p<{ $isFirstItem: boolean }>`
  font-size: 1.2rem;
  margin-top: 0.2rem;
  color: ${({ $isFirstItem }) =>
    $isFirstItem ? theme.colors.buying : theme.colors.main};
`;
