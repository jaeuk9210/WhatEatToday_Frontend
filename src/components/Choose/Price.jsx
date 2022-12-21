import React from "react";
import styled from "styled-components";
import {
  isShowMinPriceBottomSheetVar,
  isShowMaxPriceBottomSheetVar,
} from "../../apollo";
import { Hightlight, H2 } from "../../style";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceBox = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 80px auto 0px auto;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 34px;

  letter-spacing: -0.03em;

  color: #dddddd;
`;

const Title = styled.div`
  margin-top: 30px;
`;

const PriceText = styled.span`
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

const Won = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 34px;
  /* identical to box height, or 189% */

  letter-spacing: -0.03em;
  margin-left: 3px;
  color: #aaaaaa;
`;

function Price({ setValue, watch }) {
  const minPrice = watch("minPrice", "");
  const maxPrice = watch("maxPrice", "");

  return (
    <Body>
      <Title>
        <H2>
          <Hightlight>원하시는 금액대</Hightlight>를
          <br />
          선택해주세요
        </H2>
      </Title>
      <PriceBox>
        <PriceText
          selected={watch("minPrice", "").price}
          onClick={() => {
            isShowMinPriceBottomSheetVar(true);
            setValue("minPrice", minPrice);
          }}
        >
          {minPrice.price.toLocaleString("ko-KR")}
          <Won>원</Won>
        </PriceText>
        ~
        <PriceText
          selected={watch("maxPrice", "").price}
          onClick={() => {
            isShowMaxPriceBottomSheetVar(true);
            setValue("maxPrice", maxPrice);
          }}
        >
          {maxPrice.price.toLocaleString("ko-KR")}
          <Won>원</Won>
        </PriceText>
      </PriceBox>
    </Body>
  );
}

export default Price;
