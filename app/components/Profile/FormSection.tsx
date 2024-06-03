import React from 'react';
import { RegisterOptions, useFormContext } from 'react-hook-form';
import StyledInput from '@/components/Profile/StyledInput';
import styled from 'styled-components';
import { FormData } from 'app/(route)/my/profile/page';

interface FieldType {
  name: string & keyof FormData;
  label: string;
  type: string;
  rules?: RegisterOptions;
  helperText?: string;
  onClickModify?: () => void;
}

interface FormSectionProps {
  title: string;
  fields: FieldType[];
}

const FormSection = ({ title, fields }: FormSectionProps) => {
  return (
    <SectionWrapper>
      <Category>{title}</Category>
      {fields.map((props) => (
        <StyledInput {...props} key={props.name} />
      ))}
    </SectionWrapper>
  );
};

export default FormSection;

const SectionWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Category = styled.h4`
  margin-bottom: 1rem;
`;
