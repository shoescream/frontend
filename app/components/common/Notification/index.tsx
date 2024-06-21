/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import LocalStorage from '@/utils/localStorage';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import React, { useEffect, useRef, useState } from 'react';
import { ButtonWrapper } from '../Header/NavBar';
import styled from 'styled-components';

interface NotificationProps {
  onClick: () => void;
  type: 'top' | 'main';
}

const Notification = ({ onClick, type }: NotificationProps) => {
  const token = LocalStorage.getItem('@token');
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const [newNote, setNewNote] = useState(false);
  const eventSource = useRef<null | EventSource>(null);

  useEffect(() => {
    const fetchSSE = () => {
      if (token) {
        if (eventSource.current === null) {
          eventSource.current = new EventSource(
            process.env.NEXT_PUBLIC_BASE_URL + '/subscribe',
            {
              headers: {
                Authorization: `Bearer ${token}`,
                Connection: 'keep-alive',
              },
              withCredentials: true,
              heartbeatTimeout: 3600000,
            }
          );
        }

        eventSource.current.addEventListener('notification', (event: any) => {
          const { data } = event;
          if (!data.includes('EventStream Created')) {
            console.log('EventStream not created:', data);
          }

          setNewNote(true);
        });

        eventSource.current.addEventListener('error', (e) => {
          console.error('SSE Error:', e);
          eventSource.current?.close();
          setTimeout(fetchSSE, 3000);
        });
      }
    };

    fetchSSE();

    return () => {
      eventSource.current?.close();
    };
  }, [token]);

  return (
    <ButtonWrapper type={type} onClick={onClick}>
      <div>
        <span style={{ position: 'relative', padding: '0.1rem 0.8rem' }}>
          알림
          {newNote && <NewDot />}
        </span>
      </div>
    </ButtonWrapper>
  );
};

export default Notification;

const NewDot = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 100%;
  background-color: #ef6253;
  position: absolute;
  top: 0;
  right: 0;
`;
