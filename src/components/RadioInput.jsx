import React from "react";
import styled from "styled-components";

const Radios = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction};
  gap: 10px;
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Radio = styled.label`
  width: 100%;
  height: 50px;
  border: 1px solid ${(props) => (props.checked ? "#fba20c" : "#dddddd")};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: ${(props) => (props.checked ? "#fba20c" : "#dddddd")};
`;

function RadioInput({
  title,
  options,
  direction = "row",
  id,
  register,
  watch,
}) {
  return (
    <RadioGroup>
      <div>{title}</div>
      <Radios direction={direction}>
        {options.map((option, index) => (
          <Radio key={index} checked={watch(id, "").includes(option.key)}>
            <input
              type="radio"
              value={option.key}
              name={id}
              {...register(id)}
            />
            <div>{option.value}</div>
          </Radio>
        ))}
      </Radios>
    </RadioGroup>
  );
}

export default RadioInput;
