import { Response } from '@/types/Response';
import { useMutation } from '@tanstack/react-query';
import { Instance } from 'app/api';

interface AuthCodeProps {
  mail: string;
  authNumber: number;
}

interface CheckAuthCodeProps {
  onToast: (success: boolean, message: string) => void;
  onClickAuthNumber: (isMail: boolean) => void;
}

const useCheckAuthCode = ({
  onToast,
  onClickAuthNumber,
}: CheckAuthCodeProps) => {
  return useMutation({
    mutationFn: async ({ mail, authNumber }: AuthCodeProps) => {
      const response: Response<AuthCodeProps> = await Instance.get(
        '/mail-check?' + `mail=${mail}&authNumber=${authNumber}`
      );
      return response;
    },
    onSuccess: (data) => {
      onToast(true, '이메일 인증이 완료 되었습니다.');
      onClickAuthNumber(false);
    },
    onError: (error) => {
      console.error(error);
      onToast(false, '실패');
      throw error;
    },
  });
};
export default useCheckAuthCode;
