import React from "react";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import { H2 } from "../../style";
import Textinput from "../../components/Textinput";
import { useForm } from "react-hook-form";
import { SolidIButton } from "../../components/Buttons";
import { useHistory, useLocation } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import route from "../../routes";

const Body = styled.div`
  padding: 35px 21px 0 21px;
  width: 100%;
  height: 100%;
  background-color: #fff;
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
  margin-bottom: 60px;
`;

const SH2 = styled(H2)`
  text-align: left;
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

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount(
    $email: String!
    $password: String!
    $username: String!
  ) {
    createAccount(email: $email, password: $password, username: $username) {
      ok
      error
      id
    }
  }
`;

function Signup() {
  const history = useHistory();
  const location = useLocation();
  const {
    register,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    setError,
    clearErrors,
    watch,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      email: location?.state?.email || "",
    },
  });

  const onSubmitValid = (data) => {
    if (loading) {
      return;
    }
    createAccount({
      variables: {
        ...data,
      },
    });
  };
  const onCompleted = (data) => {
    const {
      createAccount: { ok, error, id },
    } = data;
    if (!ok) {
      return setError("username", {
        message: error,
      });
    }
    return history.push(route.signUp + "/additionalinfo", { id });
  };
  const [createAccount, { loading }] = useMutation(CREATE_ACCOUNT_MUTATION, {
    onCompleted,
  });
  console.log(errors.result);

  return (
    <>
      <PageTitle title="회원가입" />

      <Body>
        <Header>
          <img src="logo.svg" alt="logo" />
          <SH2>
            반갑습니다!
            <br />
            가입을 환영합니다
          </SH2>
          <Subtitle>회원이 되어 즐거운 경험을 얻어가시길 바랍니다.</Subtitle>
        </Header>

        <div>
          <Form onSubmit={handleSubmit(onSubmitValid)}>
            <Textinput
              id="email"
              validationSchema={{
                required: "Email is required",
                pattern: {
                  value:
                    /^[-0-9A-Za-z!#$%&'*+/=?^_`{|}~.]+@[-0-9A-Za-z!#$%&'*+/=?^_`{|}~]+[.]{1}[0-9A-Za-z]/,
                  message: "Please input current Email",
                  onChange() {
                    clearErrors("result");
                  },
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
            <Textinput
              id="passwordcheck"
              validationSchema={{
                required: "Password Check is required",
                onChange() {
                  clearErrors("result");
                },
                validate: (value) =>
                  value === watch("password", "") ||
                  "The Passwords do not match.",
              }}
              register={register}
              errors={errors}
              title="비밀번호 확인"
              type="password"
              placeholder="******"
            />
            <Textinput
              id="username"
              validationSchema={{
                required: "Username is required",
                onChange() {
                  clearErrors("result");
                },
              }}
              register={register}
              errors={errors}
              title="닉네임"
              type="text"
              placeholder="닉네임을 입력해주세요"
            />
            <SolidIButton
              value={loading ? "로딩중" : "다음으로"}
              disabled={!isValid || loading || !isDirty}
            />
            <ErrorMsg>{errors?.result?.message}</ErrorMsg>
          </Form>
        </div>
      </Body>
    </>
  );
}

export default Signup;
