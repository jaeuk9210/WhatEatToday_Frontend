import React from "react";
import styled from "styled-components";
import CheckBox from "../CheckBox";
import { Hightlight, SH2 as H2, Sub as SSub } from "../../style";

const CheckBoxs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: center;
  align-items: center;
`;

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

function Categories({ register }) {
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
      <CheckBoxs>
        <CheckBox
          image="MenuChoose/Korean.png"
          name="한식"
          id="categories"
          value="korean"
          register={register}
        />
        <CheckBox
          image="MenuChoose/Wastern.png"
          name="양식"
          id="categories"
          value="wastern"
          register={register}
        />
        <CheckBox
          image="MenuChoose/Chinese.png"
          name="중식"
          id="categories"
          value="chinese"
          register={register}
        />
        <CheckBox
          image="MenuChoose/Japanese.png"
          name="일식"
          id="categories"
          value="japanese"
          register={register}
        />
        <CheckBox
          image="MenuChoose/Buffet.png"
          name="뷔페"
          id="categories"
          value="buffet"
          register={register}
        />
        <CheckBox
          image="MenuChoose/Cafe.png"
          name="카페"
          id="categories"
          value="cafe"
          register={register}
        />
        <CheckBox
          image="MenuChoose/Pub.png"
          name="주점"
          id="categories"
          value="pub"
          register={register}
        />
      </CheckBoxs>
    </Body>
  );
}

export default Categories;
