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
        <Flex>
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
        <Flex>
          <Company>
            <CompanyText>크림 주식회사 · 대표 김창욱</CompanyText>
            <CompanyText>
              사업자등록번호 : 570-88-01618 <a>사업자 정보 확인</a>
            </CompanyText>
            <CompanyText isLast>
              통신판매업 : 제 2021-성남분당C-0093호
            </CompanyText>
            <CompanyText>
              사업장소재지 : 경기도 성남시 분당구 분당내곡로 131 판교테크원
              타워1, 8층
            </CompanyText>
            <CompanyText isLast>호스팅 서비스 : 네이버 클라우드 ㈜</CompanyText>
          </Company>
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
  width: 100%;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.6rem;
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
  max-width: 65.4rem;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.fontSize.body2};
  display: flex;
  flex-wrap: wrap;
  position: relative;

  & a {
    cursor: pointer;
  }
`;

const CompanyText = styled.span<{ isLast?: boolean }>`
  margin-right: ${(props) => (props.isLast ? 0 : '1.7rem')};
  line-height: 2rem;
`;

const Copyright = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: ${theme.fontSize.caption2};
  color: ${theme.colors.text.secondary};
`;
