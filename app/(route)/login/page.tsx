'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import theme from '@/styles/theme';
import React from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import KakaoLogin from '/public/kakao-login.svg';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/queries/useAuth';

interface FormData {
  id: string;
  password: string;
}

const Login = () => {
  const router = useRouter();
  const { mutate } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
  });

  const submitHandler = (data: FormData) => {
    mutate({
      userId: data.id,
      password: data.password,
    });
  };

  return (
    <LoginContainer>
      <Content>
        <Logo>
          <h1>KREAM</h1>
          <p>KICKS RULE EVERYTHING AROUND ME</p>
        </Logo>
        <Form onSubmit={handleSubmit(submitHandler)}>
          <Input
            name={'id'}
            register={register}
            errormessage={errors.id?.message as string}
            label="아이디"
            placeholder="예) shoescream"
            styles={{ padding: '1rem 0 1.4rem' }}
            rules={{
              required: {
                value: true,
                message: '필수 값입니다.',
              },
            }}
          />
          <Input
            type="password"
            name={'password'}
            register={register}
            errormessage={errors.password?.message as string}
            label="비밀번호"
            styles={{ padding: '2.5rem 0 1.4rem', marginBottom: '2rem' }}
            rules={{
              required: {
                value: true,
                message: '필수 값입니다.',
              },
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
          />
          <Button type="submit" styles={{ marginTop: '2rem' }}>
            <Text>로그인</Text>
          </Button>
        </Form>
        <List>
          <ListItem onClick={() => router.push('/join')}>이메일 가입</ListItem>
          <ListItem onClick={() => router.push('/login/find_id')}>
            아이디 찾기
          </ListItem>
          <ListItem onClick={() => router.push('/login/find_password')}>
            비밀번호 찾기
          </ListItem>
        </List>
        <Button
          type="button"
          styles={{ marginTop: '4rem' }}
          buttonColor={'none'}
        >
          <SocialLoginButtonWrapper>
            <KakaoLogin />
            <strong>카카오 로그인</strong>
            <Blank />
          </SocialLoginButtonWrapper>
        </Button>
      </Content>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  width: 100%;
`;

const Content = styled.div`
  width: 40rem;
  height: 100%;
  margin: 0 auto;
  padding: 6rem 0 16rem;
`;

const Logo = styled.div`
  padding-bottom: 5rem;
  text-align: center;
  font-weight: bold;

  & h1 {
    font-style: italic;
  }

  & p {
    font-size: ${theme.fontSize.caption1};
    font-style: normal;
    margin-top: 0.5rem;
  }
`;

const Form = styled.form`
  width: 100%;
`;

const List = styled.ul`
  display: flex;
  margin-top: 2rem;
  justify-content: space-around;
  font-size: ${theme.fontSize.body2};
  border-right-color: ${theme.colors.border};
  border-right-width: 1px;
`;

const ListItem = styled.li`
  padding: 0 3.3rem;
  border-right: 0.1rem solid ${theme.colors.border};
  cursor: pointer;
  &:nth-last-child(1) {
    border-right: none;
  }
`;

const Blank = styled.div`
  width: 2rem;
  height: 2rem;
`;

const SocialLoginButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  padding: 0 2rem;
  font-size: 1.4rem;
`;

const Text = styled.span`
  font-size: 1.6rem;
  color: white;
  font-weight: 700;
`;
