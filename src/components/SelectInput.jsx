import React from "react";
import styled, { css } from "styled-components";
import { Label } from "../style";

const STextinput = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  border: none;
  border-bottom: 1px solid #d6d6d6;
  &:focus {
    border-bottom: 1px solid #000;
  }
  appearance: none;
  -webkit-appearance: none;
  -webkit-border-radius: 0;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  &:invalid {
    color: #dddddd;
  }
`;

const Option = styled.option`
  ${(props) =>
    props.disabled &&
    css`
      display: none;
    `}
`;

const ErrorMsg = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 12px;
  margin-top: 5px;
  color: ${(props) => props.theme.error};
`;

function SelectInput({
  title,
  type,
  placeholder,
  errors,
  register,
  id,
  validationSchema,
  onChange,
  pattern,
  options,
}) {
  return (
    <STextinput>
      <Label>{title}</Label>
      <Select
        id={id}
        name={id}
        placeholder={placeholder}
        {...register(id, validationSchema)}
      >
        {options.map((option) => (
          <Option
            key={option.value}
            value={option.value}
            disabled={option.value === "" && true}
            selected={option.value === "" && true}
          >
            {option.name}
          </Option>
        ))}
      </Select>
      {errors[id]?.message ? <ErrorMsg>{errors[id]?.message}</ErrorMsg> : null}
    </STextinput>
  );
}

export default SelectInput;
