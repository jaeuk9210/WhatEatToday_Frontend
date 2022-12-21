import React from "react";
import styled from "styled-components";
import {
  isShowStartTimeBottomSheetVar,
  isShowEndTimeBottomSheetVar,
} from "../../apollo";
import { Hightlight, H2 } from "../../style";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  margin-top: 30px;
`;

const TimeText = styled.span`
  display: flex;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 32px;
  line-height: 34px;
  /* identical to box height, or 106% */

  letter-spacing: -0.03em;

  color: ${(props) => (props.selected ? "#1A1A1A" : "#EEEEEE")};
  align-items: center;
`;

const TimeBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 80px auto 0 auto;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 34px;
  /* identical to box height, or 189% */

  letter-spacing: -0.03em;

  color: #dddddd;
`;

const Meridiem = styled.span`
  font-weight: 500;
  font-size: 18px;
  line-height: 34px;
  /* identical to box height, or 189% */

  letter-spacing: -0.03em;
  margin-left: 3px;
`;

function Time({ setValue, watch }) {
  const startTime = watch("startTime", []);
  const endTime = watch("endTime", []);
  return (
    <Body>
      <Title>
        <H2>
          <Hightlight>시간대</Hightlight>를
          <br />
          선택해주세요
        </H2>
      </Title>
      <TimeBox>
        <TimeText
          selected={watch("startTime", "")}
          onClick={() => {
            isShowStartTimeBottomSheetVar(true);
            //setValue("startTime", objectWithoutKey(startTime, "divider"));
          }}
        >
          {startTime.hour.toString().padStart(2, "0")}:
          {startTime.minute.toString().padStart(2, "0")}
          <Meridiem>{startTime.meridiem}</Meridiem>
        </TimeText>
        ~
        <TimeText
          selected={watch("endTime", "")}
          onClick={() => {
            isShowEndTimeBottomSheetVar(true);
            //setValue("endTime", objectWithoutKey(endTime, "divider"));
          }}
        >
          {endTime.hour.toString().padStart(2, "0")}:
          {endTime.minute.toString().padStart(2, "0")}
          <Meridiem>{endTime.meridiem}</Meridiem>
        </TimeText>
      </TimeBox>
    </Body>
  );
}

export default Time;
