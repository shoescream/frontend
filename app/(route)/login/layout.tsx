'use client';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const LoginLayout = ({ children }: PropsWithChildren) => {
	return (
		<Container>
			<header>header</header>
			{children}
			<footer>footer</footer>
		</Container>
	);
};

export default LoginLayout;

const Container = styled.div`
	width: 100%;
`;
