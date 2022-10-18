import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#CCC",
  accentColor: "#FBA20C",
  facebook: "#3A559F",
  black: "#1c1c1c",
  error: "#EB5545",
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input{
    all: unset;
  }
  * {
    box-sizing: border-box;
  }
  a{
    text-decoration: none;
  }
  button{
    background-color: transparent;
    border: none;
  }
`;

export const Hightlight = styled.span`
  color: ${(props) => props.theme.accentColor};
`;

export const H1 = styled.h1`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  text-align: center;

  /* Text Color */

  color: ${(props) => props.theme.black};
`;

export const SH2 = styled.h2`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 34px;

  /* Text Color */
  color: #1c1c1c;
`;

export const Label = styled.label`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 12px;

  /* Text Color */
  color: #000;
`;

export const Sub = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */
  letter-spacing: -0.03em;
`;
