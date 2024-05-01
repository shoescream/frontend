'use client';

import styled from 'styled-components';

export default function Home() {
	return (
		<main>
			<header>header</header>
			<Content>content</Content>
			<footer>footer</footer>
		</main>
	);
}

const Content = styled.div`
	height: 100vh;
`;
