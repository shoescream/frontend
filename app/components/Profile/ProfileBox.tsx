import React, { useRef } from 'react';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import DefaultImage from 'public/svgs/default-profile.svg';
import theme from '@/styles/theme';

const ProfileBox = () => {
  const ref = useRef<HTMLInputElement>(null);
  const { watch, getValues, setValue } = useFormContext();

  const nickname = getValues('nickname');
  const image = watch('image');

  const handleUploadFile = () => {
    if (ref.current) {
      const file = ref.current.files?.[0];
      const reader = new FileReader();
      reader.readAsDataURL(file!);
      reader.onloadend = () => {
        setValue('image', reader.result as string);
      };
    }
  };

  return (
    <Box>
      <Avatar>
        {image ? (
          <StyledImage src={image} alt="profile image" />
        ) : (
          <DefaultImage />
        )}
      </Avatar>
      <div>
        <Nickname>{nickname}</Nickname>
        <ButtonGroup>
          <input
            hidden
            ref={ref}
            type="file"
            accept="image/*"
            onChange={handleUploadFile}
          />
          <CustomButton onClick={() => ref.current?.click()}>
            이미지 변경
          </CustomButton>
          <CustomButton onClick={() => setValue('image', '')}>
            삭제
          </CustomButton>
        </ButtonGroup>
      </div>
    </Box>
  );
};

export default ProfileBox;

const ButtonGroup = styled.div`
  display: flex;
  gap: 0.8rem;
  margin-top: 1.2rem;
`;

const Box = styled.div`
  border-bottom: 0.1rem solid ${theme.colors.border};
  display: flex;
  align-items: center;
  padding: 3.8rem 0;
`;

const Avatar = styled.div`
  width: 9rem;
  height: 9rem;
  border-radius: 9rem;
  margin-right: 1.2rem;
  overflow: hidden;
`;

const Nickname = styled.strong`
  font-size: ${theme.fontSize.title2};
`;

const StyledImage = styled.img`
  width: inherit;
  height: inherit;
  object-fit: cover;
`;

export const CustomButton = styled.div`
  height: 3.4rem;
  border: 0.1rem solid ${theme.colors.border};
  color: ${theme.colors.text.primary};
  background-color: white;
  border-radius: 1rem;
  font-size: ${theme.fontSize.caption1};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 1.1rem;
  cursor: pointer;
`;
