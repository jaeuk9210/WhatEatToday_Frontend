import { useReactiveVar } from "@apollo/client";
import React from "react";
import styled from "styled-components";
import {
  isShowMinPriceBottomSheetVar,
  isShowMaxPriceBottomSheetVar,
  choicedMinPrice,
  choicedMaxPrice,
} from "../../apollo";
import { Hightlight, SH2 as H2 } from "../../style";

const Body = styled.div`
  display: flex;
  flex-direction: column;
`;

const PriceBox = styled.div``;

const Title = styled.div`
  margin-top: 30px;
  margin-bottom: 25px;
`;

function Price({ setValue }) {
  const minPrice = useReactiveVar(choicedMinPrice);
  const maxPrice = useReactiveVar(choicedMaxPrice);

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
        <span
          onClick={() => {
            isShowMinPriceBottomSheetVar(true);
            setValue("minPrice", minPrice);
          }}
        >
          {minPrice.price.toLocaleString("ko-KR")}
        </span>
        원~
        <span
          onClick={() => {
            isShowMaxPriceBottomSheetVar(true);
            setValue("maxPrice", maxPrice);
          }}
        >
          {maxPrice.price.toLocaleString("ko-KR")}
        </span>
        원
      </PriceBox>
    </Body>
  );
}

export default Price;
