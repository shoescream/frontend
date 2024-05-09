'use client';

import {
  useKakaoLogin,
  useKakaoProfile,
  useSocialLogin,
} from '@/hooks/queries/useAuth';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Kakao = () => {
  const [code, setCode] = useState('');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const codeFromURL = query.get('code');
    if (codeFromURL) {
      setCode(codeFromURL);
    }
  }, []);

  const { data: loginData, isError: loginError } = useKakaoLogin(code);
  const kakaoAccessToken = loginData?.data.access_token;
  const kakaoRefreshToken = loginData?.data.refresh_token;
  const { data: newData } = useKakaoProfile(
    kakaoAccessToken,
    kakaoRefreshToken
  );
  const { mutate } = useSocialLogin();

  useEffect(() => {
    if (newData) {
      mutate(newData!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData]);

  if (loginError) {
    return <KakaoContainer>에러가 발생했습니다.</KakaoContainer>;
  }

  return;
};

export default Kakao;

const KakaoContainer = styled.div`
  height: calc(100vh - 30.5rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
