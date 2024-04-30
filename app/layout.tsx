import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ReactQueryClientProvider } from './hooks/ReactQueryClientProvider';
import localFont from 'next/font/local';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Shoescream',
	description: 'Shoescream',
};

const pretendard = localFont({
	src: '../public/fonts/PretendardVariable.woff2',
	display: 'swap',
	weight: '45 920',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ReactQueryClientProvider>
			<html lang='en'>
				<body className={`${inter.className} ${pretendard.className}`}>
					{children}
				</body>
			</html>
		</ReactQueryClientProvider>
	);
}
