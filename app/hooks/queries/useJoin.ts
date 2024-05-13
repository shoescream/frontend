import { Response } from '@/types/Response';
import { useMutation } from '@tanstack/react-query';
import { Instance } from 'app/api';
import { useRouter } from 'next/navigation';

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
export default useJoin;
