import LocalStorage from '@/utils/localStorage';
import { useQuery } from '@tanstack/react-query';
import { Instance, InstanceWithToken } from 'app/api';

const useSubscribeNotifications = ({ memberId }: { memberId: number }) => {
  return useQuery({
    enabled: !!memberId && !!LocalStorage.getItem('@token'),
    retry: false,
    queryKey: ['subscribe-notification', memberId],
    queryFn: async () => {
      const response = await InstanceWithToken('/subscribe', {
        params: {
          'Last-Event-Id': String(memberId),
        },
        headers: {
          'Content-Type': 'text/event-stream',
          Accept: '*/*',
        },
      });

      console.log(response);

      return response.data;
    },
  });
};

export { useSubscribeNotifications };
