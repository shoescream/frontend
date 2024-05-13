'use client';

import styled from 'styled-components';
import theme from './styles/theme';
import { useRouter } from 'next/navigation';

const Error = () => {
  const router = useRouter();

  return (
    <ErrorContainer>
      <ErrorNumber>404</ErrorNumber>
      <Subtitle>PAGE NOT FOUND</Subtitle>
      <Text>
        {
          '주소가 올바르지 않거나 알 수 없는 오류로 인해\n페이지를 찾을 수 없습니다.'
        }
      </Text>
      <ErrorButton onClick={() => router.push('/')}>
        홈으로 돌아가기
      </ErrorButton>
    </ErrorContainer>
  );
};

export default Error;

const ErrorContainer = styled.div`
  width: 100%;
  height: calc(100vh - 30.6rem);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorNumber = styled.h1`
  font-size: 17.6rem;
  font-weight: 800;
  margin-bottom: 1.6rem;
`;

const ErrorButton = styled.button`
  width: 13.8rem;
  height: 3.7rem;
  border-radius: 0.8rem;
  margin-top: 4rem;
  border: 0.1rem solid ${theme.colors.border};
  background-color: white;
  font-size: ${theme.fontSize.body1};
  &:hover {
    background-color: #f2f2f2;
  }
`;

const Subtitle = styled.h3`
  font-size: 2rem;
  font-weight: 300;
`;

const Text = styled.p`
  font-size: ${theme.fontSize.body2};
  font-weight: 300;
  margin-top: 1.6rem;
  white-space: pre-wrap;
  text-align: center;
  color: ${theme.colors.text.secondary};
  line-height: 1%.8;
`;
