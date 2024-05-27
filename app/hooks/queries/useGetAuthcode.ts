import { Response } from '@/types/Response';
import { useMutation } from '@tanstack/react-query';
import { Instance } from 'app/api';

interface MailProps {
  mail: string;
}

interface MailNumberProps {
  onToast: (success: boolean, message: string) => void;
  onClickAuthNumber: (isMail: boolean) => void;
  setTimer: (timer: number) => void;
}

const useMailNumber = ({
  onToast,
  onClickAuthNumber,
  setTimer,
}: MailNumberProps) => {
  return useMutation({
    mutationFn: async ({ mail }: MailProps) => {
      const response: Response<MailProps> = await Instance.post(
        '/mail?' + `mail=${mail}`
      );
      return response;
    },
    onSuccess: (data) => {
      onToast(true, '입력하신 이메일로 인증 코드가 전송되었습니다.');
      onClickAuthNumber(true);
      setTimer(5);
    },
    onError: (error) => {
      console.error(error);
      onToast(false, '다시 시도해 주세요.');
      throw error;
    },
  });
};
export default useMailNumber;
