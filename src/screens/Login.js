import React from "react";
import styled from "styled-components";
import * as Appbar from "../components/Appbar";
import PageTitle from "../components/PageTitle";
import { H1, SH2 } from "../style";

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
function Login({ history }) {
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
        <Form></Form>
      </Body>
    </>
  );
}

export default Login;
