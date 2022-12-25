import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#CCC",
  accentColor: "#FBA20C",
  facebook: "#3A559F",
  black: "#1c1c1c",
  error: "#EB5545",
  backgroundColor: "#f5f5f5",
};

export const GlobalStyles = createGlobalStyle`
  ${reset}
  input{
    all: unset;
  }
  * {
    box-sizing: border-box;
    font-family: "Pretendard";
    font-style: normal;
  }
  a{
    text-decoration: none;
  }
  button{
    background-color: transparent;
    border: none;
  }
  html, body{
    background-color: #f5f5f5;
    -ms-overflow-style: none;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  #root{
    height: 100%;
  }

  ::-webkit-scrollbar {
    display: none;
  }
  .picker-item{
    font-family: 'Pretendard';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 26px;
    letter-spacing: -0.03em;
  }
  .picker-item-selected{
    font-size: 30px;
  }
`;

export const Hightlight = styled.span`
  color: ${(props) => props.theme.accentColor};
`;

export const H1 = styled.h1`
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  //text-align: center;

  /* Text Color */

  color: ${(props) => props.theme.black};
`;

export const H2 = styled.h2`
  font-weight: ${(props) => props.weight || 500};
  font-size: ${(props) => props.size || "24px"};
  line-height: ${(props) => props.height || "34px"};
  text-align: ${(props) => props.align || "left"};
  /* Text Color */
  color: #1c1c1c;
`;

export const Label = styled.label`
  font-weight: 500;
  font-size: 14px;
  line-height: 12px;

  /* Text Color */
  color: #000;
`;

export const Sub = styled.span`
  font-weight: 400;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height */
  letter-spacing: -0.03em;
`;

export const Container = styled.div`
  width: 100%;
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
`;

export const Box = styled.div`
  width: 100%;
  padding: 20px 21px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
`;

export const Wrapper = styled.div`
  display: flex;
  max-width: 930px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: scroll;
`;
