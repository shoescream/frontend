'use client';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import CustomToast from '@/components/common/Toast';
import useFind from '@/hooks/queries/useFind';
import theme from '@/styles/theme';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface FormData {
  email: string;
  authNumber: number;
}

const Find = (props: any) => {
  const [isToast, setIsToast] = useState(false);
  const [toastProps, setToastProps] = useState({ success: false, message: '' });
  const [success, setSuccess] = useState(false);
  const [id, setId] = useState<string | undefined>('');
  const type = props.params.type;

  const title = type === 'id' ? '아이디 찾기' : '비밀번호 찾기';

  const onToast = (success: boolean, message: string) => {
    setIsToast(true);
    setToastProps({ success: success, message: message });
    setTimeout(function () {
      setIsToast(false);
    }, 2000);
  };

  const onSuccess = (id: string) => {
    setSuccess(true);
    setId(id);
  };
  const find = useFind({ onToast, onSuccess, type });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });
  const onSubmit = (data: FormData) => {
    find.mutate({
      mail: data.email,
    });
  };
  const router = useRouter();
  return (
    <Container>
      {!success && (
        <>
          <Title>{title}</Title>
          <form onSubmit={handleSubmit(onSubmit)}>
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
              type="submit"
              styles={{
                marginTop: '2rem',
                fontSize: ' 1.6rem',
                fontWeight: '700',
              }}
            >
              {title}
            </Button>
            <Button
              buttonColor="light"
              onClick={() => router.push('/login')}
              styles={{
                marginTop: '2rem',
                fontSize: ' 1.6rem',
                fontWeight: '700',
              }}
            >
              돌아가기
            </Button>
          </form>
          <CustomToast {...toastProps} isToast={isToast}></CustomToast>
        </>
      )}
      {success && (
        <FindWrapper>
          <h2>{title}에 성공하였습니다.</h2>
          {type === 'id' ? (
            <div>
              <p>{id}</p>
            </div>
          ) : (
            <p>임시 비밀번호가 입력하신 메일로 발송 되었습니다.</p>
          )}
          <Button
            buttonColor="dark"
            onClick={() => router.push('/login')}
            styles={{
              marginTop: '2rem',
              fontSize: ' 1.6rem',
              fontWeight: '700',
            }}
          >
            로그인
          </Button>
        </FindWrapper>
      )}
    </Container>
  );
};

export default Find;

const Container = styled.div`
  height: 100%;
  width: 40rem;
  margin: 0 auto;
  padding: 6rem 0 16rem;
`;
const Title = styled.h2`
  text-align: center;
  padding-bottom: 5rem;
`;
const FindWrapper = styled.div`
  text-align: center;
  h2 {
    border-bottom: 0.1rem solid ${theme.colors.border};
    height: 4rem;
    margin-bottom: 2rem;
  }
`;
