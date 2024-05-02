'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';
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
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const onSubmit = (data: FormData) => {
    //data submit
  };
  const router = useRouter();
  return (
    <JoinContainer>
      <Title>회원가입</Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="text"
          label="아이디*"
          name="id"
          placeholder="아이디를 입력해주세요"
          errormessage={errors.id?.message || ''}
          register={register}
          rules={{
            required: true,
            minLength: {
              value: 8,
              message: '아이디는 8자이상 영문+숫자만 가능합니다.',
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: '아이디는 8자이상 영문+숫자만 가능합니다.',
            },
          }}
        ></Input>
        <Input
          type="password"
          label="비밀번호*"
          name="password"
          placeholder="비밀번호를 입력해주세요"
          errormessage={errors.password?.message || ''}
          register={register}
          rules={{
            required: true,
            minLength: {
              value: 8,
              message: '8자이상 영문+숫자+특수문자로 입력해주세요.',
            },
            pattern: {
              value: /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[\W_]).{8,}$/,
              message: '8자이상 영문+숫자+특수문자로 입력해주세요.',
            },
          }}
        ></Input>
        <Input
          type="text"
          label="이메일*"
          name="email"
          placeholder="이메일을 입력해주세요"
          errormessage={errors.email?.message || ''}
          register={register}
          rules={{
            required: true,
            pattern: {
              value: /^\S+@\S+$/i,
              message: '이메일 형식에 알맞게 입력해주세요.',
            },
          }}
        ></Input>
        <Button type="submit">가입하기</Button>
        <Button buttonColor="light" onClick={() => router.push('/')}>
          돌아가기
        </Button>
      </form>
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
