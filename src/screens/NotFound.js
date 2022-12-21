import React from "react";
import styled from "styled-components";
import { Wrapper as SWrapper } from "../style";

const Wrapper = styled(SWrapper)`
  background: #fff;
`;

function NotFound() {
  return (
    <Wrapper>
      <h1>올바른 경로가 아닙니다.</h1>
    </Wrapper>
  );
}

export default NotFound;
