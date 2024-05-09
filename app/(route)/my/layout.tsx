'use client';

import { MYPAGE_NAV } from '@/constants/navMypage';
import theme from '@/styles/theme';
import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, useEffect } from 'react';
import styled from 'styled-components';

const MyPageLayout = ({ children }: PropsWithChildren) => {
  const pathname = usePathname();

  return (
    <Layout>
      <LeftBox>
        <h2 style={{ paddingBottom: '3rem' }}>마이 페이지</h2>
        <h3 style={{ marginBottom: '1.2remz' }}>쇼핑 정보</h3>
        <Column>
          {MYPAGE_NAV.slice(0, 4).map((item) => (
            <ListItem key={item.name}>
              <ListText
                href={item.path}
                style={{
                  color:
                    pathname === item.path
                      ? theme.colors.main
                      : theme.colors.text.secondary,
                  fontWeight: pathname === item.path ? 700 : 400,
                }}
              >
                {item.name}
              </ListText>
            </ListItem>
          ))}
        </Column>
        <h3 style={{ marginBottom: '1.2rem', marginTop: '4rem' }}>내 정보</h3>
        <Column>
          {MYPAGE_NAV.slice(4).map((item) => (
            <ListItem key={item.name}>
              <ListText
                href={item.path}
                style={{
                  color:
                    pathname === item.path
                      ? theme.colors.main
                      : theme.colors.text.secondary,
                  fontWeight: pathname === item.path ? 700 : 400,
                }}
              >
                {item.name}
              </ListText>
            </ListItem>
          ))}
        </Column>
      </LeftBox>
      <RightBox>{children}</RightBox>
    </Layout>
  );
};

export default MyPageLayout;

const Layout = styled.div`
  padding: 4rem 4rem 16rem 4rem;
  display: flex;
  gap: 2rem;
`;

const LeftBox = styled.div`
  width: 18rem;
`;

const RightBox = styled.div`
  width: 100rem;
`;

const ListItem = styled.li`
  margin-top: 1.2rem;
`;

const ListText = styled.a`
  font-size: ${theme.fontSize.subtitle3};
  color: ${theme.colors.text.secondary};
`;

const Column = styled.ul`
  display: flex;
  flex-direction: column;
`;
