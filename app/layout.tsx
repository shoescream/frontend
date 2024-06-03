'use client';

import { ReactQueryClientProvider } from './hooks/ReactQueryClientProvider';
import styled, { ThemeProvider } from 'styled-components';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import theme from '@/styles/theme';
import GlobalStyle from './GlobalStyle';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { usePathname } from 'next/navigation';

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
  const pathname = usePathname();
  const isProductPayPage =
    pathname.includes('/buy/') || pathname.includes('/sell/');

  return (
    <ReactQueryClientProvider>
      <ThemeProvider theme={theme}>
        <html lang="en">
          <body className={`${inter.className} ${pretendard.className}`}>
            <GlobalStyle />
            <Container>
              <HeaderWrapper>
                <div style={{ width: '128rem' }}>
                  <Header />
                </div>
              </HeaderWrapper>
              <Content className={isProductPayPage ? 'full-width' : ''}>
                <ContentWrapper
                  className={isProductPayPage ? 'full-width' : ''}
                >
                  {children}
                </ContentWrapper>
              </Content>
              <FooterWrapper>
                <Footer />
              </FooterWrapper>
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.div`
  height: 100%;
  margin: 0 auto;
  padding: 0 4rem;

  &.full-width {
    width: ${window.innerWidth};
    margin: 13rem 0 0;
    padding: 0;
  }
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  background-color: white;
  width: 100%;
  z-index: 3;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  padding-top: 13rem;

  &.full-width {
    width: 100%;
    padding: 0;
  }
`;

const FooterWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
