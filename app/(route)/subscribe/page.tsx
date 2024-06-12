'use client';

import { useSubscribeNotifications } from '@/hooks/queries/useSubscribeNotifications';
import LocalStorage from '@/utils/localStorage';
import React, { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useRouter } from 'next/navigation';

const Subscribe = () => {
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const user = JSON.parse(LocalStorage.getItem('@user')!).memberId;
  useSubscribeNotifications({ memberId: user?.memberId });
  const token = LocalStorage.getItem('@token');

  useEffect(() => {
    if (token) {
      try {
        const fetchSse = async () => {
          const eventSource = new EventSource(
            process.env.NEXT_PUBLIC_BASE_URL + '/subscribe',
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Connection: 'keep-alive',
              },
              withCredentials: true,
              heartbeatTimeout: 18000000,
            }
          );

          eventSource.addEventListener('notification', (event: any) => {
            const { data } = event;
            console.log(data);
            if (!data.includes('EventStream Created')) {
              console.log('EventStream not created:', data);
            }
          });

          eventSource.addEventListener('error', (e) => {
            console.error('SSE Error:', e);
          });

          return () => {
            eventSource.close();
          };
        };
        fetchSse();
      } catch (error) {
        console.error('Error fetching SSE:', error);
      }
    }
  }, [token]);

  return <div></div>;
};

export default Subscribe;
