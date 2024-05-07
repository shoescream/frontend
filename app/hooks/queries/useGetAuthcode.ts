import { Response } from '@/types/Response';
import { useMutation } from '@tanstack/react-query';
import { Instance } from 'app/api';

interface MailProps {
  mail: string;
}

interface MailNumberProps {
  onToast: (success: boolean, message: string) => void;
  onClickAuthNumber: () => void;
}

const useMailNumber = ({ onToast, onClickAuthNumber }: MailNumberProps) => {
  return useMutation({
    mutationFn: async ({ mail }: MailProps) => {
      const response: Response<MailProps> = await Instance.post(
        '/mail?' + `mail=${mail}`
      );
      console.log(response);
      return response;
    },
    onSuccess: (data) => {
      if (data.result) {
        onToast(true, '성공');
        onClickAuthNumber();
        console.log(data.result);
      }
    },
    onError: (error) => {
      console.error(error);
      onToast(false, '실패');
      throw error;
    },
  });
};
export default useMailNumber;
