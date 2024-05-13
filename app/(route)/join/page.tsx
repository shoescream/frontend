'use client';

import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import Timer from '@/components/common/Timer';
import CustomToast from '@/components/common/Toast';
import useCheckAuthCode from '@/hooks/queries/useCheckAuthcode';
import useMailNumber from '@/hooks/queries/useGetAuthcode';
import { useJoin } from '@/hooks/queries/useAuth';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
interface FormData {
  id: string;
  password: string;
  email: string;
  username: string;
  authNumber: number;
}
const Join = () => {
  const [mailSuccess, setMailSuccess] = useState(false);
  const [isToast, setIsToast] = useState(false);
  const [toastProps, setToastProps] = useState({ success: false, message: '' });
  const [time, setTime] = useState(5);

  const onToast = (success: boolean, message: string) => {
    setIsToast(true);
    setToastProps({ success: success, message: message });
    setTimeout(function () {
      setIsToast(false);
    }, 2000);
  };

  const onClickAuthNumber = (isMail: boolean) => {
    setMailSuccess(isMail);
  };

  const setTimer = (timer: number) => {
    setTime(timer * 60 * 1000);
  };

  const mailNumber = useMailNumber({ onToast, onClickAuthNumber, setTimer });
  const checkAuthCode = useCheckAuthCode({ onToast, onClickAuthNumber });
  const join = useJoin();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    const { email, id, password, username } = data;
    join.mutate({
      memberId: id,
      password: password,
      name: username,
      email: email,
    });
  };

  const getAuthNumber = () => {
    const email = getValues('email');
    mailNumber.mutate({ mail: email });
  };

  const checkEmail = () => {
    const authNumber = getValues('authNumber');
    const email = getValues('email');
    checkAuthCode.mutate({ mail: email, authNumber: authNumber });
  };

  const router = useRouter();

  useEffect(() => {
    if (time === 0) {
      onToast(false, '시간이 만료 되었습니다.');
      setTimer(5);
      setMailSuccess(false);
    }
  });
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
            pattern: {
              value: /^[a-zA-Z]+([a-zA-Z0-9])*$/,
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
            required: {
              value: true,
              message: '필수 값입니다.',
            },
            pattern: {
              value:
                /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+\\\|\[\]{};:'",.<>\/?]).{9,}$/,
              message:
                '영문, 숫자, 특수문자를 조합해서 9자 이상 입력해주세요. (대소문자 구분)',
            },
            minLength: {
              value: 9,
              message:
                '영문, 숫자, 특수문자를 조합해서 9자 이상 입력해주세요. (대소문자 구분)',
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
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: '이메일 형식에 알맞게 입력해주세요.',
              },
            }}
            styles={{ width: '30rem' }}
          ></Input>
          <Button
            size="medium"
            onClick={getAuthNumber}
            styles={{
              height: '3.8rem',
              marginTop: '3.6rem',
              marginLeft: '1rem',
            }}
          >
            인증번호 받기
          </Button>
        </EmailFormWrapper>
        <AuthNumberWrapper mailSuccess={mailSuccess ? 'true' : 'false'}>
          <Input
            type="text"
            label="인증번호 입력*"
            name="authNumber"
            placeholder="이메일로 받은 인증번호를 입력해주세요"
            errormessage={errors.authNumber?.message || ''}
            register={register}
            rules={{
              required: true,
              pattern: {
                value: /^[0-9]+$/,
                message: '숫자만 입력 가능합니다',
              },
            }}
            readonly={!mailSuccess}
            styles={{ width: '40rem' }}
          ></Input>
          <Button
            size="small"
            onClick={checkEmail}
            styles={{
              height: '3.8rem',
              marginTop: '3.6rem',
              marginLeft: '1rem',
            }}
            disabled={!mailSuccess}
          >
            확인
          </Button>
          {mailSuccess && <Timer time={time} setTime={setTime} />}
        </AuthNumberWrapper>
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
        <Button
          type="submit"
          styles={{
            marginTop: '2rem',
            fontSize: ' 1.6rem',
            color: 'white',
            fontWeight: '700',
          }}
        >
          가입하기
        </Button>
        <Button
          buttonColor="light"
          onClick={() => router.push('/login')}
          styles={{
            fontSize: ' 1.6rem',
            fontWeight: '700',
          }}
        >
          돌아가기
        </Button>
      </form>
      <CustomToast {...toastProps} isToast={isToast}></CustomToast>
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
  width: 40rem;
  position: relative;
`;

const AuthNumberWrapper = styled.div<{ mailSuccess: string }>`
  // display: ${(props) => (props.mailSuccess === 'true' ? 'flex' : 'none')};
  display: flex;
  width: 40rem;
  position: relative;
`;
