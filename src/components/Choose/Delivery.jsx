import React from "react";
import styled from "styled-components";
import { Hightlight, H2, Sub as SSub } from "../../style";
import CheckBox from "../CheckBox";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Sub = styled(SSub)`
  margin-top: 8px;
  color: #ccc;
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

function Delivery({ register, watch }) {
  return (
    <Body>
      <Title>
        <H2>
          <Hightlight>어떻게</Hightlight>
          <br />
          드시겠어요?
        </H2>
        <Sub>*다중선택가능</Sub>
        <CheckBoxs>
          <CheckBox
            image="Delivery/Go.png"
            name="포장 주문"
            id="delivery"
            value="pickup"
            register={register}
            direction="row"
            width="100%"
            height="70px"
            align="start"
            textSize="16px"
            check={watch("delivery", "").includes("go")}
          />
          <CheckBox
            image="Delivery/Here.png"
            name="매장 식사"
            id="delivery"
            value="here"
            register={register}
            direction="row"
            width="100%"
            height="70px"
            align="start"
            textSize="16px"
            check={watch("delivery", "").includes("here")}
          />
          <CheckBox
            image="Delivery/Delivery.png"
            name="배달 주문"
            id="delivery"
            value="delivery"
            register={register}
            direction="row"
            width="100%"
            height="70px"
            align="start"
            textSize="16px"
            check={watch("delivery", "").includes("delivery")}
          />
        </CheckBoxs>
      </Title>
    </Body>
  );
}

export default Delivery;
