'use client';

import React from 'react';
import styled from 'styled-components';

const Login = () => {
	return (
		<LoginContainer>
			<Content>login</Content>
		</LoginContainer>
	);
};

export default Login;

const LoginContainer = styled.div`
	height: 100vh;
`;

const Content = styled.div`
	height: 100%;
	width: 40rem;
	margin: 0 auto;
`;
