/* eslint-disable react-hooks/exhaustive-deps */
import styled from 'styled-components';
import { MouseEvent, useEffect, useState } from 'react';
import { TfiClose } from 'react-icons/tfi';
import { useForm } from 'react-hook-form';
import Input from '../../Input';
import theme from '@/styles/theme';
import { BANK_LIST } from '@/constants/bankList';
import { IoMdCheckmark } from 'react-icons/io';
import { IoCaretDownCircleOutline } from 'react-icons/io5';
import Button from '../../Button';

interface FormData {
  accountNumber: number;
  depositor: string;
}

interface SizeModalProps {
  onClose: () => void;
  onSetAccountData: (value: FormData & { bankName: string }) => void;
  accountData: {
    bankName: string;
    accountNumber: number;
    depositor: string;
  };
}

const SellingAccountModal = ({
  onClose,
  onSetAccountData,
  accountData,
}: SizeModalProps) => {
  const [selectedBank, setSelectedBank] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const {
    register,
    setValue,
    handleSubmit: submit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (
      accountData &&
      accountData.accountNumber &&
      accountData.bankName &&
      accountData.depositor
    ) {
      setValue('accountNumber', accountData.accountNumber);
      setValue('depositor', accountData.depositor);
      setSelectedBank(accountData.bankName);
    }
  }, [accountData]);

  const handleContentClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleSelectClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleOptionClick = (bank: string) => {
    setSelectedBank(bank);
    setIsDropdownOpen(false);
  };

  const handleSubmit = (data: FormData) => {
    onSetAccountData({ ...data, bankName: selectedBank });
    onClose();
  };

  return (
    <Blur onClick={onClose}>
      <div>
        <Content onClick={handleContentClick}>
          <ModalHeader>
            <h1 style={{ fontSize: '1.8rem' }}>판매 정산 계좌</h1>
            <CloseButton onClick={onClose}>
              <TfiClose />
            </CloseButton>
          </ModalHeader>
          <form
            style={{ padding: '0 2rem 2rem' }}
            onSubmit={submit(handleSubmit)}
          >
            <InputBox>
              <Subtitle>은행명</Subtitle>
              <SelectContainer>
                <Select onClick={handleSelectClick} hasValue={!!selectedBank}>
                  {selectedBank || '선택하세요'}
                  <IoCaretDownCircleOutline
                    size={24}
                    stroke={theme.colors.border}
                    fill="#222"
                  />
                </Select>
                {isDropdownOpen && (
                  <Dropdown>
                    {BANK_LIST.map((bank) => (
                      <Option
                        key={bank}
                        onClick={() => handleOptionClick(bank)}
                      >
                        {bank}
                        {bank === selectedBank && <IoMdCheckmark size={18} />}
                      </Option>
                    ))}
                  </Dropdown>
                )}
              </SelectContainer>
            </InputBox>
            <InputBox>
              <Subtitle>계좌번호</Subtitle>
              <Input
                type="text"
                name="accountNumber"
                register={register}
                rules={{
                  pattern: {
                    value: /^[0-9]*$/,
                    message: '올바른 계좌번호를 입력해주세요.',
                  },
                  maxLength: {
                    value: 11,
                    message: '올바른 계좌번호를 입력해주세요. (최대 11자리)',
                  },
                }}
                errormessage={errors.accountNumber?.message!}
                placeholder="- 없이 입력하세요"
                inputStyle={{ marginTop: 0 }}
                styles={{ paddingBottom: 0 }}
              />
            </InputBox>
            <InputBox>
              <Subtitle>예금주</Subtitle>
              <Input
                type="text"
                name="depositor"
                register={register}
                rules={{
                  pattern: {
                    value: /^[a-zA-Z가-힣\s]+$/,
                    message: '올바른 이름을 입력하세요',
                  },
                  minLength: {
                    value: 2,
                    message: '올바른 이름을 입력해주세요. (2-50자)',
                  },
                  maxLength: {
                    value: 50,
                    message: '올바른 이름을 입력해주세요. (2-50자)',
                  },
                }}
                errormessage={errors.depositor?.message!}
                placeholder="예금주명을 정확히 입력하세요"
                inputStyle={{ marginTop: 0 }}
              />
            </InputBox>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                paddingBottom: '2rem',
                position: 'relative',
              }}
            >
              <Button
                type="submit"
                size="medium"
                styles={{
                  position: 'absolute',
                  bottom: '-2rem',
                  border: 'none',
                  fontSize: '1.4rem',
                  height: '4.2rem',
                }}
              >
                저장하기
              </Button>
            </div>
          </form>
        </Content>
      </div>
    </Blur>
  );
};

export default SellingAccountModal;

const Blur = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  background-color: #22222290;
  position: fixed;
  z-index: 4;
`;

const Content = styled.div`
  width: 44.8rem;
  height: 40rem;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 1rem 0 rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  z-index: 2;
  background-color: white;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none !important;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: ${theme.fontSize.title2};
  height: 5.8rem;
  position: relative;
`;

const CloseButton = styled.button`
  background-color: transparent;
  outline: none;
  border: none;
  position: absolute;
  right: 2rem;
  margin-top: 0.5rem;
`;

const Subtitle = styled.h4`
  font-size: ${theme.fontSize.body2};
  font-weight: 600;
`;

const InputBox = styled.div`
  padding: 1.6rem 0 1.4rem;
`;

const SelectContainer = styled.div`
  position: relative;
  width: 100%;
`;

const Select = styled.div<{ hasValue: boolean }>`
  padding: 0.6rem 0 0.7rem;
  cursor: pointer;
  border-bottom: 0.1rem solid ${theme.colors.border};
  font-size: ${theme.fontSize.subtitle3};
  width: 100%;
  position: relative;
  outline: none;
  color: ${(props) => (props.hasValue ? theme.colors.main : '#bcbcbc')};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 24rem;
  overflow-y: auto;
  border: 0.1rem solid #ebebeb;
  background-color: white;
  z-index: 3;
  border-top: none;
`;

const Option = styled.div`
  padding: 0.9rem 1.6rem 1rem 1.6rem;
  font-size: ${theme.fontSize.body2};
  cursor: pointer;
  position: relative;
  color: ${theme.colors.text.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
