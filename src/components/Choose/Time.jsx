import { useReactiveVar } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import {
  choicedEndTime as eTime,
  isShowStartTimeBottomSheetVar,
  choicedStartTime as sTime,
  isShowEndTimeBottomSheetVar,
} from "../../apollo";
import { Hightlight, SH2 as H2 } from "../../style";
import { objectWithoutKey } from "../../utils";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin-top: 30px;
  margin-bottom: 25px;
`;

function Time({ setValue }) {
  const startTime = useReactiveVar(sTime);
  const endTime = useReactiveVar(eTime);
  return (
    <Body>
      <Title>
        <H2>
          <Hightlight>시간대</Hightlight>를
          <br />
          선택해주세요
        </H2>
      </Title>
      <span
        onClick={() => {
          isShowStartTimeBottomSheetVar(true);
          setValue("startTime", objectWithoutKey(startTime, "divider"));
        }}
      >
        {startTime.hour.toString().padStart(2, "0")}:
        {startTime.minute.toString().padStart(2, "0")} {startTime.meridiem}
      </span>
      ~
      <span onClick={() => isShowEndTimeBottomSheetVar(true)}>
        {endTime.hour.toString().padStart(2, "0")}:
        {endTime.minute.toString().padStart(2, "0")} {endTime.meridiem}
      </span>
    </Body>
  );
}

export default Time;
