'use client';

import { ReactQueryClientProvider } from './hooks/ReactQueryClientProvider';
import styled, { ThemeProvider } from 'styled-components';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import theme from '@/styles/theme';
import GlobalStyle from './GlobalStyle';

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
				<html lang='en'>
					<body className={`${inter.className} ${pretendard.className}`}>
						<GlobalStyle />
						<Container>
							<Content>{children}</Content>
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
`;

const Content = styled.div`
	max-width: 128rem;
	margin: 0 auto;
	padding: 0 4rem;
`;
