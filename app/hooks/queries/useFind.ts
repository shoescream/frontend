import { Response } from '@/types/Response';
import { useMutation } from '@tanstack/react-query';
import { Instance } from 'app/api';

interface UseFindProps {
  mail: string;
}

interface FindProps {
  onToast: (success: boolean, message: string) => void;
  onSuccess: (id: string) => void;
  type: string;
}

const useFind = ({ onToast, onSuccess, type }: FindProps) => {
  return useMutation({
    mutationFn: async ({ mail }: UseFindProps) => {
      const response: Response<UseFindProps> =
        type === 'id'
          ? await Instance.get('/signin/find-id?' + `email=${mail}`)
          : await Instance.post('/signin/find-password', { email: mail });
      console.log(response);
      return response;
    },
    onSuccess: (data) => {
      if (type === 'id') {
        onSuccess('id');
      } else {
        onSuccess('');
      }
    },
    onError: (error) => {
      console.error(error);
      onToast(false, '다시 시도해 주세요.');
      throw error;
    },
  });
};
export default useFind;
