'use client';

import { ReactQueryClientProvider } from './hooks/ReactQueryClientProvider';
import { ThemeProvider } from 'styled-components';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';
import theme from '@/styles/theme';

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
						{children}
					</body>
				</html>
			</ThemeProvider>
		</ReactQueryClientProvider>
	);
};

export default RootLayout;
