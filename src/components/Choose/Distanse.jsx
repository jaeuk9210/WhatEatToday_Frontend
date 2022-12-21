import React from "react";
import styled from "styled-components";
import { Hightlight, H2 } from "../../style";
import CheckBox from "../CheckBox";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin-top: 30px;
  margin-bottom: 25px;
`;

const CheckBoxs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 25px auto 0 auto;
  width: 100%;
`;

function Distanse({ register, watch }) {
  return (
    <Body>
      <Title>
        <H2>
          <Hightlight>거리</Hightlight>를
          <br />
          선택해주세요
        </H2>
      </Title>
      <CheckBoxs>
        <CheckBox
          name="500m"
          id="distanse"
          value="500m"
          register={register}
          direction="row"
          width="100%"
          height="70px"
          align="start"
          textSize="16px"
          check={watch("distanse", "").includes("500m")}
        />
        <CheckBox
          name="1km"
          id="distanse"
          value="1km"
          register={register}
          direction="row"
          width="100%"
          height="70px"
          align="start"
          textSize="16px"
          check={watch("distanse", "").includes("1km")}
        />
        <CheckBox
          name="5km"
          id="distanse"
          value="5km"
          register={register}
          direction="row"
          width="100%"
          height="70px"
          align="start"
          textSize="16px"
          check={watch("distanse", "").includes("5km")}
        />
      </CheckBoxs>
    </Body>
  );
}

export default Distanse;
