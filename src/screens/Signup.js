import React from "react";
import styled from "styled-components";
import * as Appbar from "../components/Appbar";
import PageTitle from "../components/PageTitle";
import { H1, SH2 } from "../style";
import Textinput from "../components/Textinput";
import { useForm } from "react-hook-form";
import { IButton } from "../components/Buttons";

const Body = styled.div`
  padding: 0 21px 0 21px;
`;

const Subtitle = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  /* identical to box height, or 157% */

  letter-spacing: -0.01em;

  color: #aaaaaa;

  flex: none;
  order: 1;
  flex-grow: 0;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 15px;
`;

const H2 = styled(SH2)`
  text-align: left;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 30px;
`;

function Signup({ history }) {
  const {
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  return (
    <>
      <PageTitle title="회원가입" />
      <Appbar.AppbarBox>
        <Appbar.AppbarLeft>
          <button onClick={() => history.goBack()}>
            <img src="icon/back.svg" alt="back" />
          </button>
        </Appbar.AppbarLeft>
        <Appbar.AppbarCenter>
          <H1>계정 만들기</H1>
        </Appbar.AppbarCenter>
        <Appbar.AppbarRight />
      </Appbar.AppbarBox>

      <Body>
        <div>
          <img src="logo.svg" alt="logo" />
          <Header>
            <H2>
              반갑습니다!
              <br />
              가입을 환영합니다
            </H2>
            <Subtitle>회원이 되어 즐거운 경험을 얻어가시길 바랍니다.</Subtitle>
          </Header>
        </div>
        <div>
          <Form>
            <Textinput
              id="email"
              validationSchema={{
                required: "Email is required",
                pattern: {
                  value:
                    /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/,
                  message: "Please input current Email",
                },
              }}
              register={register}
              errors={errors}
              title="이메일"
              type="email"
              placeholder="jaeuk@jeuke.com"
            />
            <Textinput
              id="password"
              validationSchema={{ required: "Password is required" }}
              register={register}
              errors={errors}
              title="비밀번호"
              type="password"
              placeholder="******"
            />
            <Textinput
              id="passwordcheck"
              validationSchema={{ required: "Password is required" }}
              register={register}
              errors={errors}
              title="비밀번호 확인"
              type="password"
              placeholder="******"
            />
            <Textinput
              id="username"
              validationSchema={{ required: "Username is required" }}
              register={register}
              errors={errors}
              title="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
            />
            <IButton value="로그인" />
          </Form>
        </div>
      </Body>
    </>
  );
}

/*
<Textinput
  title="비밀번호 확인"
  type="password"
  placeholder="******"
/>
<Textinput
  title="닉네임"
  type="text"
  placeholder="닉네임을 입력해주세요"
  isError="true"
/>*/
export default Signup;
