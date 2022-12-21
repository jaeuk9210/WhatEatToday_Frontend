import styled from "styled-components";
import React from "react";

export const IButton = styled.input.attrs({
  type: "submit",
})`
  max-width: 334px;
  width: 100%;
  height: 55px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  /* identical to box height, or 175% */
  text-align: center;

  border-radius: 500px;
  border: 1px solid;
  cursor: pointer;
  &:disabled {
    cursor: default;
    background: #dddddd;
    color: #fff;
  }
`;

export const Button = styled.button`
  max-width: 334px;
  width: 100%;
  height: 55px;

  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 28px;
  /* identical to box height, or 175% */
  text-align: center;

  border-radius: 500px;
  border: 1px solid;
  &:disabled {
    background: #dddddd;
    color: #fff;
  }
`;

const FacebookButton = styled(Button)`
  display: flex;
  border: none;
  justify-content: center;
  background: #3a559f;
  color: #fff;
`;

const GoogleButton = styled(Button)`
  display: flex;
  justify-content: center;
  border: 1px solid #f1f1f1;
  background: #f8f8f8;
  color: #000;
`;

const KakaoButton = styled(Button)`
  display: flex;
  justify-content: center;
  border: none;
  background: #fee500;
  color: #391b1b;
`;

const AppleButton = styled(Button)`
  display: flex;
  justify-content: center;
  border: 1px solid #f1f1f1;
  background: #fff;
  color: #000;
`;

export const SolidIButton = styled(IButton)`
  /* orange */
  background: linear-gradient(270deg, #fba20c 0%, #ffb800 0.01%, #fb9b0c 100%);
  border: none;
  color: #ffffff;
`;

export const SolidButton = styled(Button)`
  /* orange */
  background: linear-gradient(270deg, #fba20c 0%, #ffb800 0.01%, #fb9b0c 100%);
  border: none;
  color: #ffffff;
`;

export const OutlineButton = styled(IButton)`
  box-sizing: border-box;
  background: #ffffff;
  border: 1px solid ${(props) => props.theme.accentColor};
  /* color 1 */
  color: ${(props) => props.theme.accentColor};
`;

const Divide = styled.div`
  width: 1px;
  height: 20px;
  opacity: 0.2;
  color: #fff;
`;

export function SocialLoginButton(props) {
  switch (props.social) {
    case "kakao":
      return (
        <KakaoButton {...props}>
          <img src={`icon/social/${props.social}.png`} alt="Kakao Logo" />
          <Divide />
          카카오 계정으로 로그인
        </KakaoButton>
      );
    case "google":
      return (
        <GoogleButton {...props}>
          <img src={`icon/social/${props.social}.png`} alt="Google Logo" />
          <Divide />
          구글 계정으로 로그인
        </GoogleButton>
      );
    case "facebook":
      return (
        <FacebookButton {...props}>
          <img src={`icon/social/${props.social}.png`} alt="Facebook Logo" />
          <Divide />
          페이스북 계정으로 로그인
        </FacebookButton>
      );
    case "apple":
      return (
        <AppleButton {...props}>
          <img src={`icon/social/${props.social}.png`} alt="Apple Logo" />
          <Divide />
          애플 계정으로 로그인
        </AppleButton>
      );
    default:
  }
}
