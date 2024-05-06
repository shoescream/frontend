import { Response } from '@/types/Response';
import { useMutation } from '@tanstack/react-query';
import { Instance } from 'app/api';

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

interface LoginProps {
  userId: string;
  password: string;
}

const useLogin = () => {
  return useMutation({
    mutationFn: async ({ userId, password }: LoginProps) => {
      const response: Response<LoginResponse> = await Instance.post(
        '/sign-in',
        {
          userId,
          password,
        }
      );

      return response;
    },
    onSuccess: (data) => {
      if (data.header.isSuccess && data.result) {
        localStorage.setItem('@token', data.result.accessToken);
        localStorage.setItem('@refresh', data.result.refreshToken);
      }
    },
    onError: (error) => {
      console.error('useLogin: ', error.message);
      throw error;
    },
  });
};

export { useLogin };
