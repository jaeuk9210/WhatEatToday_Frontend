import React from "react";
import styled from "styled-components";
import { Container as SContainer, Hightlight, H2 } from "../style";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import route from "../routes";
import { Link, useHistory } from "react-router-dom";
import useUser from "../hooks/useUser";
import PageTitle from "../components/PageTitle";
import { gql, useQuery } from "@apollo/client";

const Body = styled.div`
  flex-direction: column;
  display: flex;
  background-color: #f5f5f5;
  align-items: center;
  width: 100%;
`;

const Wraper = styled.div`
  display: flex;
  max-width: 930px;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Box = styled.div`
  width: 100%;
  padding: 21px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const LinkedBtn = styled(Link)`
  width: fit-content;
  display: inline-block;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  /* identical to box height, or 129% */
  letter-spacing: -0.03em;

  color: #bbbbbb;
  margin-top: 20px;
  position: relative;
`;

const MenuChoose = styled(LinkedBtn)`
  width: 100%;
  height: 400px;
`;

const FriendFood = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  border: 1px solid #f1f1f1;
  background-color: #eee;
  overflow: hidden;
`;

const FriendFoodImg = styled.img`
  width: 100%;
`;

const SubTitle = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  /* Service Colors/Gray Colors/Black */

  color: #1a1a1a;
`;

const RowFlex = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

const ColumnFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      file
    }
  }
`;

const TopImg = styled.img`
  position: absolute;
  max-width: 330px;
  width: 100%;
  right: -50px;
  bottom: 0px;
`;

const Container = styled(SContainer)`
  overflow: scroll;
`;

function Home() {
  const history = useHistory();
  const { data: user, refetch } = useUser();
  const feedData = useQuery(FEED_QUERY).data;

  if (!user?.me?.firstName || user?.me?.firstName === null) {
    refetch().then(({ data }) => {
      if (data.me.firstName === null)
        history.push(route.signUp + "/additionalinfo", { id: data.me.id });
    });
  }
  return (
    <Container>
      <PageTitle title="오늘 뭐 먹지" />
      <Body>
        <Wraper>
          <Box>
            <MenuChoose to={route.choose}>
              <ColumnFlex>
                <H2 size={"28px"} height={"42px"}>
                  {user?.me?.username}님
                  <br />
                  <Hightlight>제육볶음</Hightlight>(은)는
                  <br />
                  어떠세요?
                </H2>
                <p>
                  메뉴 고르러가기
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    style={{ marginLeft: "10px" }}
                  />
                </p>
              </ColumnFlex>
              <TopImg src="./Home.png" />
            </MenuChoose>
          </Box>
          <Box>
            <SubTitle>친구는 뭐먹지?</SubTitle>
            <RowFlex>
              {feedData?.seeFeed?.map((review) => (
                <LinkedBtn to={"/story/" + review.id} key={review.id}>
                  <FriendFood>
                    <FriendFoodImg src={review.file[0]}></FriendFoodImg>
                  </FriendFood>
                </LinkedBtn>
              ))}
            </RowFlex>
          </Box>
        </Wraper>
      </Body>
    </Container>
  );
}

export default Home;
