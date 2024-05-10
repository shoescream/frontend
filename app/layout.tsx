'use client';

import { ReactQueryClientProvider } from './hooks/ReactQueryClientProvider';
import styled, { ThemeProvider } from 'styled-components';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import theme from '@/styles/theme';
import GlobalStyle from './GlobalStyle';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

const inter = Inter({ subsets: ['latin'] });
const pretendard = localFont({
  src: '../public/fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '45 920',
});

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <ReactQueryClientProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body className={`${inter.className} ${pretendard.className}`}>
            <GlobalStyle />
            <Container>
              <Content>
                <HeaderWrapper>
                  <Header />
                </HeaderWrapper>
                <div>{children}</div>
                <Footer />
              </Content>
            </Container>
          </body>
        </html>
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
};

export default RootLayout;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const Content = styled.div`
  width: 128rem;
  height: 100%;
  margin: 0 auto;
  padding: 0 4rem;
`;

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  background-color: white;
  width: 120rem;
  z-index: 3;
`;
