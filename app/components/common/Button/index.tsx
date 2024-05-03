'use client';

import { ButtonHTMLAttributes } from 'react';
import styled, { CSSProperties } from 'styled-components';
import theme from '../../../styles/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	size?: 'small' | 'medium' | 'large' | 'xlarge' | 'full';
	buttonColor?: 'dark' | 'light' | 'selling' | 'buying' | 'none';
	onClick?: () => void;
	className?: string;
	hasPrice?: string;
	styles?: CSSProperties;
}

const Button = ({
	type = 'button',
	size = 'full',
	buttonColor = 'dark',
	hasPrice,
	onClick,
	disabled,
	children,
	styles,
}: ButtonProps) => {
	const sizeValue = theme.button.size[size];
	const buttonColorValue = disabled
		? theme.colors.gray[200]
		: buttonColor === 'none'
		? 'transparent'
		: theme.button.color[buttonColor];
	const fontSize = hasPrice ? '0.8rem' : theme.fontSize.caption3;
	return (
		<Container
			type={type}
			buttonColor={buttonColorValue}
			onClick={onClick}
			size={sizeValue}
			disabled={disabled!}
			fontSize={fontSize}
			style={styles}
		>
			{children}
			<div className='price'>{hasPrice}</div>
		</Container>
	);
};

const Container = styled.button<{
	buttonColor: string;
	size: string;
	fontSize: string;
	disabled: boolean;
}>`
	height: 48px;
	border-radius: 10px;
	border: solid 1px ${theme.colors.border};
	font-size: ${(props) => props.fontSize};
	width: ${(props) => props.size};
	color: ${(props) => (props.buttonColor === '#ffffff' ? '#000000' : '#ffffff')};
	background-color: ${(props) => props.buttonColor};
	cursor: pointer;
	&:active {
		background-color: ${(props) =>
			props.buttonColor === '#000000' ? '#333333' : ''};
	}
	.price {
		font-size: ${theme.fontSize.caption1};
		margin-top: 3px;
	}
`;

export default Button;
