/* eslint-disable @next/next/no-img-element */
'use client';

import theme from '@/styles/theme';
import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import styled from 'styled-components';
import SizeListModal from '@/components/common/Modal/SizeListModal';
import ProfileBox from '@/components/Profile/ProfileBox';
import FormSection from '@/components/Profile/FormSection';
import { useRouter } from 'next/navigation';
import LocalStorage from '@/utils/localStorage';

export interface FormData {
  id: string;
  password: string;
  email: string;
  phone: string;
  shoeSize: number;
  nickname: string;
  introduction: string;
  image: string;
}

const Profile = () => {
  const router = useRouter();
  const [isSizeModalOpen, setIsSizeModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(NaN);
  const methods = useForm<FormData>();
  const { setValue, handleSubmit } = methods;
  const user = JSON.parse(LocalStorage.getItem('@user')!);

  useEffect(() => {
    setValue('email', user.email);
    setValue('id', user.memberId);
    setValue('image', user.profileImage);
    setValue('nickname', user.memberId);
  }, []);

  const onSubmit = (data: FormData) => {
    console.log('Submitted data:', data);
  };

  return (
    <FormProvider {...methods}>
      {isSizeModalOpen && (
        <SizeListModal
          onClose={() => setIsSizeModalOpen(false)}
          currentItem={currentItem}
          onSetCurrentItem={setCurrentItem}
          onSetValue={(num) => setValue('shoeSize', num)}
        />
      )}
      <Container>
        <Section>
          <TitleBox>
            <Title>프로필 관리</Title>
          </TitleBox>
          <ProfileBox />
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <FormSection
              title="프로필 정보"
              fields={[
                {
                  name: 'nickname',
                  label: '프로필 이름',
                  type: 'text',
                  helperText:
                    '변경 후 30일이 지나야 다시 변경 가능하므로 신중히 변경해주세요.',
                },
                { name: 'introduction', label: '소개', type: 'text' },
              ]}
              originId={user.memberId}
            />
          </FormWrapper>
        </Section>
        <Section>
          <TitleBox>
            <Title>로그인 정보</Title>
          </TitleBox>
          <FormWrapper onSubmit={handleSubmit(onSubmit)}>
            <FormSection
              title="내 계정"
              fields={[
                {
                  name: 'id',
                  label: '아이디',
                  type: 'text',
                },
                {
                  name: 'password',
                  label: '비밀번호',
                  type: 'password',
                },
              ]}
            />
            <FormSection
              title="개인 정보"
              fields={[
                {
                  name: 'email',
                  label: '이메일',
                  type: 'email',
                },
                {
                  name: 'shoeSize',
                  label: '신발 사이즈',
                  type: 'number',
                  onClickModify: () => setIsSizeModalOpen(true),
                },
              ]}
            />
          </FormWrapper>
          <WithDrawal onClick={() => router.push('/my/withdrawal')}>
            탈퇴하기
          </WithDrawal>
        </Section>
      </Container>
    </FormProvider>
  );
};

export default Profile;

const Container = styled.div`
  padding: 2rem;
`;

const Section = styled.div`
  margin-bottom: 6rem;
`;

const TitleBox = styled.div`
  border-bottom: 0.3rem solid ${theme.colors.main};
  padding-bottom: 1.6rem;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  line-height: 2.9rem;
`;

const FormWrapper = styled.form`
  max-width: 48rem;
  padding-top: 4rem;
`;

const WithDrawal = styled.a`
  font-size: ${theme.fontSize.body2};
  color: ${theme.colors.text.secondary};
  margin-top: 8.5rem;
  padding: 0.5rem 0;
  text-decoration: underline;
  float: left;
  cursor: pointer;

  :hover {
    color: ${theme.colors.text.secondary} !important;
  }
`;
