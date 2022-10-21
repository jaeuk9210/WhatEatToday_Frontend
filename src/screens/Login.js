import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import * as Appbar from "../components/Appbar";
import { IButton } from "../components/Buttons";
import PageTitle from "../components/PageTitle";
import Textinput from "../components/Textinput";
import route from "../routes";
import { H1, SH2 } from "../style";

const ErrorMsg = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 12px;
  margin-top: 5px;
  color: ${(props) => props.theme.error};
`;

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

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      ok
      error
      token
    }
  }
`;

function Login({ history }) {
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: location?.state?.email || "",
    },
  });

  const onCompleted = (data) => {
    const {
      login: { ok, error, token },
    } = data;
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (token) {
      logUserIn(token);
      history.push(route.home);
    }
  };

  const [login, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = () => {
    if (loading) {
      return;
    }
    const { email, password } = getValues();
    login({
      variables: { email, password },
    });
  };

  return (
    <>
      <PageTitle title="로그인" />
      <Appbar.AppbarBox>
        <Appbar.AppbarLeft>
          <button onClick={() => history.goBack()}>
            <img src="icon/back.svg" alt="back" />
          </button>
        </Appbar.AppbarLeft>
        <Appbar.AppbarCenter>
          <H1>로그인</H1>
        </Appbar.AppbarCenter>
        <Appbar.AppbarRight />
      </Appbar.AppbarBox>
      <Body>
        <div>
          <img src="logo.svg" alt="logo" />
          <Header>
            <H2>
              안녕하세요
              <br />
              다시 만나 반갑습니다!
            </H2>
            <Subtitle>로그인을 하시고 저희 서비스를 이용해보세요.</Subtitle>
          </Header>
        </div>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Textinput
            id="email"
            validationSchema={{
              required: "Email is required",
              pattern: {
                value:
                  /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/,
                message: "Please input current Email",
              },
              onChange() {
                clearErrors("result");
              },
            }}
            register={register}
            errors={errors}
            title="이메일"
            type="email"
            placeholder="jaeuk@jeuke.com"
            onChange={() => clearErrors("result")}
          />
          <Textinput
            id="password"
            validationSchema={{
              required: "Password is required",
              onChange() {
                clearErrors("result");
              },
            }}
            register={register}
            errors={errors}
            title="비밀번호"
            type="password"
            placeholder="******"
          />
          <IButton
            value={loading ? "로딩중" : "로그인"}
            disabled={!isValid || loading || !isDirty}
          />
          <ErrorMsg>{errors?.result?.message}</ErrorMsg>
        </Form>
      </Body>
    </>
  );
}

export default Login;
