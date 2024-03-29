import React from "react";
import styled from "styled-components";
import { Label } from "../style";

const STextinput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #d6d6d6;
  &:focus {
    border-bottom: 1px solid #000;
  }

  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
`;

const ErrorMsg = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 12px;
  color: ${(props) => props.theme.error};
`;

function Textinput({
  title,
  type,
  placeholder,
  errors,
  register,
  id,
  validationSchema,
  onChange,
  pattern,
}) {
  return (
    <STextinput>
      <Label>{title}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        {...register(id, validationSchema)}
        pattern={pattern}
      />
      {errors[id]?.message ? <ErrorMsg>{errors[id]?.message}</ErrorMsg> : null}
    </STextinput>
  );
}

export default Textinput;
