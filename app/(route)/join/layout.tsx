'use client';

import { PropsWithChildren } from 'react';
import styled from 'styled-components';

const JoinLayout = ({ children }: PropsWithChildren) => {
	return (
		<Container>
			<header>header</header>
			{children}
			<footer>footer</footer>
		</Container>
	);
};

export default JoinLayout;

const Container = styled.div`
	width: 100%;
`;
