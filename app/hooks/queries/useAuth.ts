import { Response } from '@/types/Response';
import LocalStorage from '@/utils/localStorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Instance } from 'app/api';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface LoginResponse {
  memberResponse: {
    email: string;
    memberId: string;
    name: string;
    profileImage?: string;
  };
  tokenResponse: {
    accessToken: string;
    refreshToken: string;
  };
}

interface LoginProps {
  userId: string;
  password: string;
}

const useLogin = () => {
  return useMutation({
    mutationFn: async ({ userId, password }: LoginProps) => {
      const response: { data: Response<LoginResponse> } = await Instance.post(
        '/signin',
        {
          memberId: userId,
          password,
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      console.log(data.resultCode);
      if (data.resultCode === 'SUCCESS' && data.result) {
        LocalStorage.setItem('@token', data.result.tokenResponse.accessToken);
        localStorage.setItem(
          '@refresh',
          data.result.tokenResponse.refreshToken
        );
        localStorage.setItem(
          '@user',
          JSON.stringify(data.result.memberResponse)
        );
        window.location.href = '/';
      }
    },
    onError: (error) => {
      console.error('useLogin: ', error);
      throw error;
    },
  });
};

const useKakaoLogin = (code: string) => {
  const payload = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY,
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_RETURN_URL,
    code: code,
    client_secret: process.env.NEXT_PUBLIC_KAKAO_CLIENT_SECRET,
  });

  return useQuery({
    queryKey: ['kakao-login', code],
    enabled: !!code,
    retry: false,
    queryFn: async () => {
      try {
        const response = await axios.post(
          'https://kauth.kakao.com/oauth/token',
          payload,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
          }
        );

        return response;
      } catch (error) {
        throw error;
      }
    },
  });
};

export interface SocialLoginProps {
  id: number;
  email: string;
  nickname: string;
  profile_image: string;
  access_token: string;
  refresh_token: string;
}

const useKakaoProfile = (access: string, refresh: string) => {
  return useQuery({
    queryKey: ['kakao-profile', access],
    enabled: !!access,
    retry: false,
    queryFn: async () => {
      try {
        const response = await axios.get('https://kapi.kakao.com/v2/user/me', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${access}`,
          },
        });

        const data = response.data.kakao_account;
        if (data) {
          const newData: SocialLoginProps = {
            id: response.data.id,
            nickname: data.profile.nickname,
            email: data.email,
            profile_image: data.profile.profile_image_url,
            access_token: access,
            refresh_token: refresh,
          };

          return newData;
        }
      } catch (error) {
        throw error;
      }
    },
  });
};

const useSocialLogin = () => {
  return useMutation({
    mutationFn: async (props: SocialLoginProps) => {
      const response = await Instance.post('/kakao-login', {
        ...props,
      });

      return response.data;
    },
    onSuccess: (data) => {
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
        window.location.href = '/';
      }
    },
    onError: (error) => {
      console.error('useSocialLogin: ', error);
      throw error;
    },
  });
};

interface JoinProps {
  memberId: string;
  password: string;
  name: string;
  email: string;
}

const useJoin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: async ({ memberId, password, name, email }: JoinProps) => {
      const response: Response<JoinProps> = await Instance.post('/signup', {
        memberId,
        password,
        name,
        email,
      });
      return response;
    },
    onSuccess: (data) => {
      router.push('/login');
    },
    onError: (error) => {
      console.error('useJoin: ', error.message);
      throw error;
    },
  });
};

export { useLogin, useKakaoLogin, useKakaoProfile, useSocialLogin, useJoin };
