'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
interface FormData {
  id: string;
  password: string;
  email: string;
}
const Join = () => {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange', // 에러 실시간 탐지
  });
  return (
    <JoinContainer>
      <Title>회원가입</Title>
      <Input
        type="text"
        label="아이디*"
        name="id"
        placeholder="아이디를 입력해주세요"
        errormessage={errors.id?.message || ''}
        register={register}
      ></Input>
      <Input
        type="password"
        label="비밀번호*"
        name="password"
        placeholder="비밀번호를 입력해주세요"
        errormessage={errors.password?.message || ''}
        register={register}
      ></Input>
      <Input
        type="text"
        label="이메일*"
        name="email"
        placeholder="이메일을 입력해주세요"
        errormessage={errors.email?.message || ''}
        register={register}
      ></Input>
      <Button>가입하기</Button>
      <Button buttonColor="light">돌아가기</Button>
    </JoinContainer>
  );
};

export default Join;

const JoinContainer = styled.div`
  height: 100vh;
  width: 40rem;
  margin: auto;
  padding: 5.8rem 0 16rem;
`;
const Title = styled.h2`
  text-align: center;
`;
