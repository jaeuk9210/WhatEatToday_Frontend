import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { logUserIn } from "../apollo";
import { SolidIButton } from "../components/Buttons";
import PageTitle from "../components/PageTitle";
import Textinput from "../components/Textinput";
import route from "../routes";
import { H2 } from "../style";

const Container = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  height: 100vh;
  background: #fff;
`;

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

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 15px;
  margin-top: 25px;
`;

const SH2 = styled(H2)`
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0px;
  gap: 30px;
  margin-top: 70px;
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

const Top = styled.div`
  margin-top: 35px;
`;

function Login() {
  const history = useHistory();
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
    <Container>
      <PageTitle title="로그인" />
      <Wrapper>
        <Body>
          <Top>
            <img src="logo.svg" alt="logo" />
            <Text>
              <SH2>
                안녕하세요
                <br />
                다시 만나 반갑습니다!
              </SH2>
              <Subtitle>로그인을 하시고 저희 서비스를 이용해보세요.</Subtitle>
            </Text>
          </Top>
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
            <SolidIButton
              value={loading ? "로딩중" : "로그인"}
              disabled={!isValid || loading || !isDirty}
            />
            <ErrorMsg>{errors?.result?.message}</ErrorMsg>
          </Form>
        </Body>
      </Wrapper>
    </Container>
  );
}

export default Login;
