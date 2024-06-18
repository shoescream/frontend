'use client';

import theme from '@/styles/theme';
import styled from 'styled-components';
import { FaInstagram } from 'react-icons/fa';
import { MdOutlineFacebook } from 'react-icons/md';
import Image from 'next/image';

const Footer = () => {
  return (
    <StyledFooter>
      <div>
        <Flex style={{ marginBottom: '1.6rem' }}>
          <Row>
            {[
              '서비스소개',
              '제휴문의',
              'FAQ',
              '이용약관',
              '개인정보처리방침',
            ].map((item, idx) => (
              <li key={item}>
                {idx === 4 ? (
                  <a>
                    <strong>{item}</strong>
                  </a>
                ) : (
                  <a>{item}</a>
                )}
              </li>
            ))}
          </Row>
          <Row>
            <a>
              <FaInstagram size={24} />
            </a>
            <a>
              <MdOutlineFacebook size={24} />
            </a>
            <a>
              <Image
                src="/kakao_channel.png"
                alt="kakao"
                width={27}
                height={27}
              />
            </a>
          </Row>
        </Flex>
        <Flex
          style={{
            height: '6rem',
            marginTop: '2rem',
          }}
        >
          <div>
            <DevelopersTitle>🧑🏻‍💻👩🏻‍💻 개발진</DevelopersTitle>
            <Company>
              <CompanyText>FE · 배동우 서유민 심채윤</CompanyText>
              <CompanyText>BE · 배준오 최나영</CompanyText>
            </Company>
          </div>
          <Copyright>© SHOESCREAM Corp.</Copyright>
        </Flex>
      </div>
    </StyledFooter>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  padding: 4rem 0rem 3.5rem;
  border-top: 0.1rem solid ${theme.colors.border};
  width: 128rem;
  z-index: 2;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Row = styled.ul`
  display: flex;
  gap: 2rem;
  font-size: ${theme.fontSize.body1};
  color: #000;

  & a {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
`;

const Company = styled.div`
  max-width: 70rem;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.body2};
  display: flex;
  position: relative;
  margin-top: 0.5rem;

  & a {
    cursor: pointer;
  }
`;

const DevelopersTitle = styled.span`
  font-size: 1.5rem;
  color: ${theme.colors.text.primary};
  font-weight: 550;
`;

const CompanyText = styled.span`
  line-height: 2rem;
  margin-right: 1.5rem;
`;

const Copyright = styled.div`
  font-size: ${theme.fontSize.caption2};
  color: ${theme.colors.text.secondary};
  align-self: flex-end;
`;
