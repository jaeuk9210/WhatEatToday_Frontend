import React from "react";
import styled from "styled-components";
import CheckBox from "../CheckBox";
import { Hightlight, H2, Sub as SSub } from "../../style";
import useWindowSize from "../../hooks/useWindowSize";

const CheckBoxs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 auto 25px auto;
  width: ${(props) => props.width || 105 * 5 + 40}px;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Sub = styled(SSub)`
  margin-top: 8px;
  color: #ccc;
`;

const Title = styled.div`
  margin-top: 30px;
  margin-bottom: 25px;
`;

function Categories({ register, watch }) {
  const windowWidth = useWindowSize().width - 60;

  const col = windowWidth >= 105 * 7 + 60 ? 7 : parseInt(windowWidth / 110);

  const flexboxWidth = col * 105 + (col - 1) * 10;

  return (
    <Body>
      <Title>
        <H2>
          <Hightlight>메뉴</Hightlight>를
          <br />
          선택해주세요
        </H2>
        <Sub>*다중선택가능</Sub>
      </Title>
      <CheckBoxs width={flexboxWidth}>
        <CheckBox
          image="MenuChoose/Korean.png"
          name="한식"
          id="categories"
          value="korean"
          register={register}
          check={watch("categories", "").includes("korean")}
        />
        <CheckBox
          image="MenuChoose/Wastern.png"
          name="양식"
          id="categories"
          value="wastern"
          register={register}
          check={watch("categories", "").includes("wastern")}
        />
        <CheckBox
          image="MenuChoose/Chinese.png"
          name="중식"
          id="categories"
          value="chinese"
          register={register}
          check={watch("categories", "").includes("chinese")}
        />
        <CheckBox
          image="MenuChoose/Japanese.png"
          name="일식"
          id="categories"
          value="japanese"
          register={register}
          check={watch("categories", "").includes("japanese")}
        />
        <CheckBox
          image="MenuChoose/Buffet.png"
          name="뷔페"
          id="categories"
          value="buffet"
          register={register}
          check={watch("categories", "").includes("buffet")}
        />
        <CheckBox
          image="MenuChoose/Snack.png"
          name="분식"
          id="categories"
          value="snack"
          register={register}
          check={watch("categories", "").includes("snack")}
        />
        <CheckBox
          image="MenuChoose/Cafe.png"
          name="카페"
          id="categories"
          value="cafe"
          register={register}
          check={watch("categories", "").includes("cafe")}
        />
        <CheckBox
          image="MenuChoose/Pub.png"
          name="주점"
          id="categories"
          value="pub"
          register={register}
          check={watch("categories", "").includes("pub")}
        />
      </CheckBoxs>
    </Body>
  );
}

export default Categories;
