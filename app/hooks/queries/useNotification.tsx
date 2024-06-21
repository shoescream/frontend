import { Response } from '@/types/Response';
import { useQuery } from '@tanstack/react-query';
import { InstanceWithToken } from 'app/api';

interface NotificationProps {
  notificationNumber: number;
  notificationContent: string;
  notificationType: string;
  buyerId: string;
  createdAt: string;
  isRead: boolean;
  object: {
    productName: string;
    size: string;
    price: number;
    quantity: number;
    createdAt: string;
  };
}

const useNotification = () => {
  return useQuery<Response<NotificationProps[]>>({
    retry: false,
    queryKey: ['notification'],
    queryFn: async () => {
      const response = await InstanceWithToken.get('/my/notification');
      return response.data;
    },
  });
};

export { useNotification };
