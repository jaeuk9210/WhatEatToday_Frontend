import React from "react";
import styled from "styled-components";
import { Hightlight, SH2 as H2, Sub as SSub } from "../../style";

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

function Delivery({ register }) {
  return (
    <Body>
      <Title>
        <H2>
          <Hightlight>어떻게</Hightlight>
          <br />
          드시겠어요
        </H2>
        <Sub>*다중선택가능</Sub>
      </Title>
    </Body>
  );
}

export default Delivery;
