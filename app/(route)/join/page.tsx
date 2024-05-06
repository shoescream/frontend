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
  username: string;
}
const Join = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const onSubmit = (data: FormData) => {
    //data submit
  };
  const checkEmail = () => {
    const email = getValues('email');
    //email 체크
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
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: '올바르지 않은 형식입니다.',
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
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:'",.<>\/?]).{8,16}$/,
              message:
                '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8~16글자)',
            },
            maxLength: {
              value: 16,
              message:
                '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8~16글자)',
            },
            minLength: {
              value: 8,
              message:
                '영문, 숫자, 특수문자를 조합해서 입력해주세요. (8~16글자)',
            },
          }}
        ></Input>
        <EmailFormWrapper>
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
          <Button
            size="small"
            onClick={checkEmail}
            styles={{
              height: '3.8rem',
              marginTop: '3.6rem',
              marginLeft: '1rem',
            }}
          >
            확인
          </Button>
        </EmailFormWrapper>
        <Input
          type="text"
          label="이름*"
          name="username"
          placeholder="성함을 입력해주세요"
          errormessage={errors.username?.message || ''}
          register={register}
          rules={{
            required: true,
            pattern: {
              value: /^[가-힣]+$/,
              message: '입력하신 성함이 올바르지 않습니다.',
            },
          }}
        ></Input>
        <Button type="submit" styles={{ marginTop: '2rem' }}>
          가입하기
        </Button>
        <Button buttonColor="light" onClick={() => router.push('/')}>
          돌아가기
        </Button>
      </form>
    </JoinContainer>
  );
};

export default Join;

const JoinContainer = styled.div`
  height: 100%;
  width: 40rem;
  margin: 0 auto;
  padding: 6rem 0 16rem;
`;
const Title = styled.h2`
  text-align: center;
  padding-bottom: 5rem;
`;
const EmailFormWrapper = styled.div`
  display: flex;
  width: 37rem;
  margin: 0 1.5rem;
  position: relative;
`;
