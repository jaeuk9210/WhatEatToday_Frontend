import React from "react";
import styled from "styled-components";
import * as Appbar from "../components/Appbar";
import { Hightlight, SH2 } from "../style";
import { faChevronRight, faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import BottomNavigation from "../components/BottomNavigation";
import route from "../routes";
import { Link } from "react-router-dom";
import useUser from "../hooks/useUser";

const Body = styled.div`
  background-color: #f5f5f5;
`;

const LocationBox = styled.div`
  display: flex;
  orientation: row;
`;

const Container = styled.div`
  padding: 21px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
`;

const H2 = styled(SH2)`
  font-size: 28px;
  line-height: 42px;
`;

const LinkedBtn = styled(Link)`
  display: block;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  letter-spacing: -0.03em;

  color: #bbbbbb;
  margin-top: 20px;
`;

const SearchBtn = styled.button`
  margin-bottom: 20px;
`;

function Home({ history }) {
  const {
    me: { username, avatar },
  } = useUser();
  return (
    <>
      <Appbar.AppbarBox>
        <Appbar.AppbarLeft>
          <div>
            <div>현재위치는</div>
            <div>안동 용상</div>
          </div>
        </Appbar.AppbarLeft>
        <Appbar.AppbarCenter />
        <Appbar.AppbarRight>
          <button>
            <FontAwesomeIcon icon={faBars} color="#1a1a1a" size="2x" />
          </button>
        </Appbar.AppbarRight>
      </Appbar.AppbarBox>
      <Body>
        <Container>
          <H2>
            {username}님
            <br />
            <Hightlight>제육볶음</Hightlight>(은)는
            <br />
            어떠세요?
          </H2>
          <LinkedBtn to={route.choose}>
            메뉴 고르러가기
            <FontAwesomeIcon
              icon={faChevronRight}
              style={{ marginLeft: "10px" }}
            />
          </LinkedBtn>
        </Container>
        <Container>test</Container>
      </Body>
      <BottomNavigation active="home" />
    </>
  );
}

export default Home;
