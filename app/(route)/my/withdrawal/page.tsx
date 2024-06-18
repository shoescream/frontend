'use client';

import styled from 'styled-components';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';
import { useState } from 'react';
import Button from '@/components/common/Button';
import { useRouter } from 'next/navigation';
import theme from '@/styles/theme';

const Withdrawal = () => {
  const router = useRouter();
  const [checkList, setCheckList] = useState([false, false, false]);

  const handleWithdrawal = () => {
    if (checkList[0] && checkList[1] && checkList[2]) {
      // TODO: 제한 사항 확인 -> 없으면 탈퇴 -> 있으면 알림 및 홈으로
    }
  };

  return (
    <div>
      <TitleBox>
        <Title>회원 탈퇴</Title>
      </TitleBox>
      <p style={{ marginBottom: '2rem' }}>
        잠깐! 탈퇴하기 전에 아래 정보를 확인해주세요.
      </p>
      <Box>
        <Section style={{ marginTop: 0 }}>
          <div style={{ cursor: 'pointer' }}>
            {checkList[0] ? (
              <MdCheckBox
                size={24}
                onClick={() =>
                  setCheckList([false, checkList[1], checkList[2]])
                }
              />
            ) : (
              <MdCheckBoxOutlineBlank
                size={24}
                onClick={() => setCheckList([true, checkList[1], checkList[2]])}
              />
            )}
          </div>
          <div>
            <WithdrawalTitle>
              SHOESCREAM을 탈퇴하면 회원 정보 및 서비스 이용 기록이 삭제됩니다.
            </WithdrawalTitle>
            <ListItem>
              - 내 프로필, 거래내역(구매/판매), 관심상품, 보유상품, STYLE
              게시물(게시물/댓글), 미사용 보유 포인트 등 사용자의 모든 정보가
              사라지며 재가입 하더라도 복구가 불가능합니다.
            </ListItem>
            <ListItem>
              - 탈퇴 14일 이내 재가입할 수 없으며, 탈퇴 후 동일 이메일로
              재가입할 수 없습니다
            </ListItem>
          </div>
        </Section>
        <Section>
          <div style={{ cursor: 'pointer' }}>
            {checkList[1] ? (
              <MdCheckBox
                size={24}
                onClick={() =>
                  setCheckList([checkList[0], false, checkList[2]])
                }
              />
            ) : (
              <MdCheckBoxOutlineBlank
                size={24}
                onClick={() => setCheckList([checkList[0], true, checkList[2]])}
              />
            )}
          </div>
          <div>
            <WithdrawalTitle>
              SHOESCREAM 탈퇴가 제한된 경우에는 아래 내용을 참고하시기 바랍니다.
            </WithdrawalTitle>
            <ListItem>
              - 진행 중인 거래(판매/구매)가 있을 경우: 해당 거래 종료 후 탈퇴
              가능
            </ListItem>
            <ListItem>
              - 진행 중인 입찰(판매/구매)가 있을 경우: 해당 입찰 삭제 후 탈퇴
              가능
            </ListItem>
            <ListItem>
              - 미납 수수료(착불 발송비/페널티)가 있을 경우: 해당 결제 완료 후
              탈퇴 가능
            </ListItem>
            <ListItem>
              - 이용 정지 상태인 경우: 이용 정지 해제 후 탈퇴 가능
            </ListItem>
          </div>
        </Section>
      </Box>
      <Section>
        <div style={{ cursor: 'pointer' }}>
          {checkList[2] ? (
            <MdCheckBox
              size={24}
              onClick={() => setCheckList([checkList[0], checkList[1], false])}
            />
          ) : (
            <MdCheckBoxOutlineBlank
              size={24}
              onClick={() => setCheckList([checkList[0], checkList[1], true])}
            />
          )}
        </div>
        <p style={{ marginTop: '0.3rem' }}>
          회원 탈퇴 안내를 모두 확인하였으며 탈퇴에 동의합니다.
        </p>
      </Section>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '6rem',
        }}
      >
        <Button
          type="button"
          size="large"
          customFontSize="1.4rem"
          buttonColor="none"
          styles={{
            height: '4.2rem',
            marginLeft: 0,
          }}
          onClick={handleWithdrawal}
        >
          탈퇴하기
        </Button>
        <Button
          type="button"
          size="large"
          customFontSize="1.4rem"
          buttonColor="dark"
          styles={{
            height: '4.2rem',
            marginLeft: '1.2rem',
          }}
          onClick={() => router.push('/')}
        >
          취소하기
        </Button>
      </div>
    </div>
  );
};

export default Withdrawal;

const TitleBox = styled.div`
  padding-bottom: 1.6rem;
`;

const Title = styled.h2`
  font-size: 2.2rem;
  line-height: 2.9rem;
`;

const Section = styled.div`
  flex: 1;
  border-radius: 1rem;
  display: flex;
  gap: 1.2rem;
  margin-top: 3rem;
`;

const ListItem = styled.p`
  font-size: ${theme.fontSize.body1};
  line-height: 2.2rem;
`;

const WithdrawalTitle = styled.h4`
  margin-top: 0.25rem;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const Box = styled.div`
  border: 0.1rem solid ${theme.colors.border};
  width: 85%;
  padding: 3rem;
`;
