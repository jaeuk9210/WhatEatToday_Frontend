import React, { useState } from "react";
import styled from "styled-components";

const BtnLabel = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */
  text-align: center;
`;

const OptionItem = styled.label`
  display: flex;
  position: relative;
  width: 105px;
  height: 105px;
  border: ${({ checked }) => (checked ? "1.5px" : "1px")} solid
    ${({ theme, checked }) => (checked ? theme.accentColor : "#F1F1F1")};
  justify-content: center;
  align-items: center;
  user-select: none;
  color: ${({ theme, checked }) => (checked ? theme.accentColor : "#000")};
  border-radius: 10px;
`;

const Check = styled.input.attrs({ type: "checkbox" })`
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1;
  opacity: 1;
`;

const OptionInner = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  margin-bottom: 10px;
`;

function CheckBox({ image, name, register, id, value }) {
  const [checked, setchecked] = useState(false);
  const toggle = () => {
    setchecked(!checked);
  };

  return (
    <OptionItem checked={checked}>
      <Check
        onClick={toggle}
        name={name}
        id={name}
        value={value}
        {...register(id)}
      />
      <OptionInner>
        <Img src={image} alt={name} />
        <BtnLabel>{name}</BtnLabel>
      </OptionInner>
    </OptionItem>
  );
}

export default CheckBox;
