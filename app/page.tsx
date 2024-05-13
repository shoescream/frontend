'use client';

import Image from 'next/image';
import styled from 'styled-components';
import theme from './styles/theme';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <main>
      <Content>
        <Section>
          <Blur />
          <Image src="/banner_3.png" alt="banner 3" width={370} height={680} />
        </Section>
        <Section>
          <Image src="/banner_2.png" alt="banner 2" width={340} height={264} />
        </Section>
        <Section>
          <Image src="/banner_1.png" alt="banner 1" width={466} height={842} />
        </Section>
        <TextBox>
          <Title>
            <White>Discover </White>
            the Latest Trends
          </Title>
          <Subtitle>
            <White>Explore and Enjoy our colle </White>ction for the season
          </Subtitle>
          <Button onClick={() => router.push('/shop')}>Shop Now</Button>
        </TextBox>
      </Content>
    </main>
  );
}

const Content = styled.div`
  display: flex;
  position: relative;
  z-index: 2;
`;

const Section = styled.div`
  height: 84.2rem;

  &:nth-child(1) {
    width: 37rem;
    position: relative;
    z-index: 0;
  }
  &:nth-child(2) {
    width: 42.6rem;
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;
  }
  &:nth-child(3) {
    width: 48.4rem;
  }
`;

const Blur = styled.div`
  background-color: black;
  opacity: 0.15;
  position: absolute;
  z-index: 1;
  &:nth-child(1) {
    width: 37rem;
    height: 68rem;
  }
`;

const TextBox = styled.div`
  position: absolute;
  top: 20rem;
  left: 19.5rem;
`;

const Title = styled.span`
  font-size: 4.1rem;
  color: black;
  font-weight: bold;
`;

const White = styled.span`
  color: white;
`;

const Subtitle = styled.p`
  font-size: ${theme.fontSize.body1};
  font-weight: 600;
  margin-top: 2.5rem;
  color: black;
`;

const Button = styled.button`
  width: 16rem;
  height: 4.8rem;
  margin-top: 2.5rem;
  border-radius: 0.8rem;
  font-weight: 600;
`;
