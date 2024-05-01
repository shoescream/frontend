'use client';

import theme from '@/styles/theme';
import styled from 'styled-components';
import { RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps {
	label?: string;
	name: string;
	register: UseFormRegister<any>;
	rules?: RegisterOptions;
	type?: string;
	errormessage: string;
	placeholder?: string;
}

const Input = ({
	label,
	type,
	name,
	register,
	rules,
	errormessage,
	placeholder,
}: InputProps) => {
	return (
		<InputWrapper>
			<Label errormessage={errormessage}>{label}</Label>
			<StyledInput
				type={type}
				{...register(name, rules)}
				errormessage={errormessage}
				placeholder={placeholder}
			/>
			{errormessage && <ErrorText>{errormessage}</ErrorText>}
		</InputWrapper>
	);
};

Input.displayName = 'Input';

export default Input;

const InputWrapper = styled.div`
	padding: 1rem 0 1.4rem;
	position: relative;
	width: 37rem;
	height: 8rem;
	margin: 0 auto;
`;

const Label = styled.label<Pick<InputProps, 'errormessage'>>`
	font-size: ${theme.fontSize.body2};
	line-height: 1.8rem;
	color: ${(props) => (props.errormessage ? '#f15746' : theme.colors.main)};
	font-weight: 600;
`;

const StyledInput = styled.input<Pick<InputProps, 'errormessage'>>`
	border-bottom: 0.1rem solid
		${(props) => (props.errormessage ? '#f15746' : theme.colors.border)};
	border-top: 0;
	border-left: 0;
	border-right: 0;
	height: 3.8rem;
	width: 100%;
	outline: none;
	font-size: ${theme.fontSize.subtitle3};
	color: ${theme.colors.main};
	padding-bottom: 1.4rem;
	padding-top: 1.4rem;
	margin-top: 0.4rem;
	&::placeholder {
		color: #bcbcbc;
	}
	&:focus {
		border-bottom: ${(props) =>
			props.errormessage
				? '0.1rem solid #f15746'
				: `0.2rem solid ${theme.colors.main}`};
		&::placeholder {
			color: white;
		}
	}
`;

const ErrorText = styled.p`
	color: #f15746;
	font-size: ${theme.fontSize.caption2};
	line-height: 1.6rem;
	margin-top: 0.2rem;
`;
