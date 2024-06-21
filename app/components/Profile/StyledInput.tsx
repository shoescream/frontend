import React, { useState } from 'react';
import Input from '../common/Input';
import styled from 'styled-components';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import theme from '@/styles/theme';
import Button from '../common/Button';
import { FormData } from 'app/(route)/my/profile/page';
import ModifyButton from '../common/Button/ModifyButton';

interface StyledInputProps extends Pick<HTMLInputElement, 'type'> {
  label: string;
  name: string;
  rules?: RegisterOptions;
  hasMarginTop?: boolean;
  isEditable?: boolean;
  helperText?: string;
  onClickModify?: () => void;
  originId?: string;
}

const StyledInput = ({
  label,
  type,
  name,
  rules,
  hasMarginTop = false,
  isEditable = false,
  helperText,
  onClickModify,
  originId,
}: StyledInputProps) => {
  const [changeToEdit, setChangeToEdit] = useState(false);
  const [initialValue, setInitialValue] = useState<string | undefined>();
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useFormContext<FormData>();

  const onSubmit = (data: FormData) => {
    if (name === 'id') {
      const value = data[name];
      setValue(name, value![0] + '*****' + value!.slice(-3));
    }
    setValue(name as keyof FormData, data[name as keyof FormData]);
    setChangeToEdit(false);
  };

  const handleCancel = () => {
    setValue(name as keyof FormData, initialValue as string);
    setChangeToEdit(false);
  };

  return (
    <InputWrapper>
      {!changeToEdit && (
        <ModifyButton
          onClickModify={() => {
            if (
              originId &&
              !originId.startsWith('kakao') &&
              ['id', 'password', 'email'].includes(name)
            ) {
              alert(
                '카카오 로그인 사용자는 아이디 및 비밀번호를 수정할 수 없습니다.'
              );
            } else {
              if (onClickModify) {
                onClickModify();
              } else {
                setInitialValue(getValues(name as keyof FormData) as string);
                setChangeToEdit(true);
              }
            }
          }}
        >
          변경
        </ModifyButton>
      )}
      <Input
        readonly={!isEditable && !changeToEdit}
        isFromMypage
        type={type}
        label={label}
        register={register}
        rules={rules}
        name={name}
        errormessage={''}
        styles={{ marginTop: hasMarginTop ? '1rem' : 0 }}
      />
      {changeToEdit && <HelperText>{helperText}</HelperText>}
      {changeToEdit && (
        <ButtonWrapper>
          <Button
            type="button"
            size="medium"
            customFontSize="1.4rem"
            buttonColor="none"
            styles={{
              height: '4.2rem',
              width: '9.9922rem',
              marginLeft: 0,
            }}
            onClick={handleCancel}
          >
            취소
          </Button>
          <Button
            type="button"
            size="medium"
            customFontSize="1.4rem"
            buttonColor="dark"
            styles={{
              height: '4.2rem',
              width: '9.9922rem',
              marginLeft: '1.2rem',
            }}
            onClick={handleSubmit(onSubmit)}
          >
            저장
          </Button>
        </ButtonWrapper>
      )}
    </InputWrapper>
  );
};

export default StyledInput;

const InputWrapper = styled.div`
  position: relative;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
`;

const HelperText = styled.p`
  font-size: ${theme.fontSize.caption2};
  color: ${theme.colors.text.secondary};
  line-height: 1.6rem;
`;
