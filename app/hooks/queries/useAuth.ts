import { Response } from '@/types/Response';
import { useMutation } from '@tanstack/react-query';
import { Instance } from 'app/api';

interface LoginResponse {
  memberResponse: {
    email: string;
    memberId: string;
    name: string;
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
      const response: Response<LoginResponse> = await Instance.post('/signin', {
        memberId: userId,
        password,
      });
      console.log(response);
      return response;
    },
    onSuccess: (data) => {
      if (data.resultCode === 'SUCCESS' && data.result) {
        localStorage.setItem('@token', data.result.tokenResponse.accessToken);
        localStorage.setItem(
          '@refresh',
          data.result.tokenResponse.refreshToken
        );
        localStorage.setItem(
          '@user',
          JSON.stringify(data.result.memberResponse)
        );
      }
    },
    onError: (error) => {
      console.error('useLogin: ', error);
      throw error;
    },
  });
};

export { useLogin };
