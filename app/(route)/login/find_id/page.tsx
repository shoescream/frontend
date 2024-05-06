'use client';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

interface FormData {
  id: string;
  password: string;
  email: string;
  username: string;
}

const FindId = () => {
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
    <Container>
      <Title>아이디 찾기</Title>
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
          아이디 찾기
        </Button>
        <Button buttonColor="light" onClick={() => router.push('/')}>
          돌아가기
        </Button>
      </form>
    </Container>
  );
};

export default FindId;

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
