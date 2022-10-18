import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import styled from "styled-components";
import "./slick.css";
import BottomSheet from "../components/BottomSheet";
import {
  isShowEmailBottomSheetVar,
  isShowSocialBottomSheetVar,
} from "../apollo";
import {
  OutlineButton,
  SocialLoginButton,
  SolidIButton,
  IButton,
} from "../components/Buttons";
import PageTitle from "../components/PageTitle";
import * as Appbar from "../components/Appbar";
import { SH2 } from "../style";
import Textinput from "../components/Textinput";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import route from "../routes";

const SForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 30px;
`;

const H2 = styled(SH2)`
  text-align: center;
`;

const Body = styled.div`
  display: flex !important;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Bottom = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  /* or 133% */
  text-align: center;
  letter-spacing: -0.02em;

  color: #bbbbbb;
`;

const Hightlight = styled.span`
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const TextBtn = styled.p`
  margin-right: 13px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 23px;
  /* identical to box height, or 144% */
  text-align: right;

  color: ${(props) => props.theme.accentColor};
`;

const EXIST_ACCOUNT_MUTATION = gql`
  mutation existAccount($email: String!) {
    existAccount(email: $email) {
      ok
      result
      error
    }
  }
`;

function Welcome({ history }) {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    appendDots: (dots) => (
      <div
        style={{
          width: "100%",
          position: "relative",
          bottom: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ul> {dots} </ul>
      </div>
    ),
    dotsClass: "dots_custom",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const onCompleted = (data) => {
    const {
      existAccount: { result },
    } = data;
    console.log("result", result);
    if (result) {
      history.push("/login");
    } else {
      history.push(route.signUp);
    }
  };

  const [existAccount, { loading }] = useMutation(EXIST_ACCOUNT_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const { email } = getValues();
    existAccount({
      variables: { email },
    });
    console.log("email", email);
  };

  return (
    <Container>
      <PageTitle title="오늘 뭐 먹지?" />
      <Appbar.AppbarBox>
        <Appbar.AppbarLeft />
        <Appbar.AppbarCenter />
        <Appbar.AppbarRight>
          <TextBtn>건너뛰기</TextBtn>
        </Appbar.AppbarRight>
      </Appbar.AppbarBox>
      <div>
        <Slider {...settings}>
          <Body>
            <H2>
              조건을 입력하고
              <br />
              <Hightlight>AI에게 메뉴를 추천</Hightlight> 받아보세요
            </H2>
            <img alt="slider1" src="welcome/slide1.png" />
          </Body>
          <Body>
            <H2>
              맛있는 경험을 공유하며
              <br />
              <Hightlight>음식 커뮤니티</Hightlight>를 만들어보세요
            </H2>
            <img alt="slider2" src="welcome/slide2.png" />
          </Body>
          <Body>
            <H2>
              여러분의 참여는
              <br />
              <Hightlight>식당의 발전</Hightlight>을 불러옵니다
            </H2>
            <img alt="slider3" src="welcome/slide3.png" />
          </Body>
        </Slider>
      </div>
      <Bottom>
        <Subtitle>
          계속 진행하면 ‘오늘 뭐 먹지’ 서비스 약관에 동의하고 <br />
          개인정보 보호정책을 읽었음을 인정하는 것으로 간주됩니다.
        </Subtitle>
        <OutlineButton
          onClick={() => isShowEmailBottomSheetVar(true)}
          value="이메일로 로그인하기"
        />
        <SolidIButton
          onClick={() => isShowSocialBottomSheetVar(true)}
          value="소셜계정으로 로그인하기"
        />
      </Bottom>
      <BottomSheet reactVar={isShowSocialBottomSheetVar}>
        <SocialLoginButton
          social="google"
          onClick={() => isShowSocialBottomSheetVar(false)}
        />
        <SocialLoginButton social="kakao" />
        <SocialLoginButton social="facebook" />
        <SocialLoginButton social="apple" />
      </BottomSheet>
      <BottomSheet reactVar={isShowEmailBottomSheetVar}>
        <SForm onSubmit={handleSubmit(onSubmit)}>
          <Textinput
            id="email"
            validationSchema={{
              required: "Email is required",
              pattern: {
                value:
                  /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/,
                message: "올바른 이메일 형식을 입력해주세요",
              },
            }}
            register={register}
            errors={errors}
            title="이메일"
            type="email"
            placeholder="jaeuk@jeuke.com"
          />
          <IButton value={loading ? "로딩중" : "다음으로"} />
        </SForm>
      </BottomSheet>
    </Container>
  );
}

export default Welcome;