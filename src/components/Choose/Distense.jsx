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

function Distense({ register }) {
  return (
    <Body>
      <Title>
        <H2>
          <Hightlight>거리</Hightlight>를
          <br />
          선택해주세요
        </H2>
      </Title>
    </Body>
  );
}

export default Distense;
