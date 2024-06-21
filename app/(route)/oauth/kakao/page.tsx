'use client';

import {
  useKakaoLogin,
  useKakaoProfile,
  useSocialLogin,
} from '@/hooks/queries/useAuth';
import LocalStorage from '@/utils/localStorage';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

const Kakao = () => {
  const router = useRouter();
  const [code, setCode] = useState('');
  const { data: loginData, isError: loginError } = useKakaoLogin(code);
  const kakaoAccessToken = loginData?.data.access_token;
  const kakaoRefreshToken = loginData?.data.refresh_token;
  const { data: newData } = useKakaoProfile(
    kakaoAccessToken,
    kakaoRefreshToken
  );
  const { mutate } = useSocialLogin({
    successHandler: (data) => {
      if (data.resultCode === 'SUCCESS') {
        localStorage.setItem('@token', data.result!.tokenResponse.accessToken);
        localStorage.setItem(
          '@refresh',
          data.result!.tokenResponse.refreshToken
        );
        localStorage.setItem(
          '@user',
          JSON.stringify(data.result!.memberResponse)
        );
        LocalStorage.setItem('canAccessSubscribe', 'true');
        router.push('/subscribe');
      }
    },
  });

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const codeFromURL = query.get('code');
    if (codeFromURL) {
      setCode(codeFromURL);
    }
  }, []);

  useEffect(() => {
    if (newData) {
      mutate(newData!);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newData]);

  if (loginError) {
    return <KakaoContainer>에러가 발생했습니다.</KakaoContainer>;
  }

  return <KakaoContainer>로딩 중...</KakaoContainer>;
};

export default Kakao;

const KakaoContainer = styled.div`
  height: calc(100vh - 30.5rem);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
