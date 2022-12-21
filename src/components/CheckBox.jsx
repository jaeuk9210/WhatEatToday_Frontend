import React, { useState } from "react";
import styled from "styled-components";

const BtnLabel = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  /* identical to box height */
  text-align: center;
`;

const OptionItem = styled.label`
  display: flex;
  position: relative;
  width: ${(props) => props.width || "105px"};
  height: ${(props) => props.height || "105px"};
  border: ${({ checked }) => (checked ? "1.5px" : "1px")} solid
    ${({ theme, checked }) => (checked ? theme.accentColor : "#F1F1F1")};
  align-items: center;
  user-select: none;
  color: ${(props) =>
    props.checked ? props.theme.accentColor : props.color || "#000"};
  font-size: ${(props) => props.textSize || "13px"};
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
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  justify-content: ${(props) => props.align || "center"};
  align-items: center;
  gap: ${(props) => props.gap || "10px"};
  padding: 10px;
`;

const Img = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  mix-blend-mode: ${(props) => (props.checked ? "normal" : "luminosity")};
  opacity: ${(props) => (props.checked ? "100%" : "50%")};
`;

function CheckBox({
  image,
  name,
  register,
  id,
  value,
  check,
  textSize,
  textColor,
  width,
  height,
  direction,
  gap,
  align,
}) {
  const [checked, setchecked] = useState(check);
  const toggle = () => {
    setchecked(!checked);
  };

  return (
    <OptionItem
      checked={checked}
      textSize={textSize}
      color={textColor}
      width={width}
      height={height}
    >
      <Check
        onClick={toggle}
        name={name}
        id={name}
        value={value}
        {...register(id)}
      />
      <OptionInner direction={direction} gap={gap} align={align}>
        {image ? <Img src={image} alt={name} checked={checked} /> : undefined}
        <BtnLabel>{name}</BtnLabel>
      </OptionInner>
    </OptionItem>
  );
}

export default CheckBox;
