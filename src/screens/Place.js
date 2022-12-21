import { faChevronLeft, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import {
  Appbar as SAppbar,
  LeftBox,
  MiddleBox,
  RightBox,
} from "../components/header";
import { Container, Wrapper } from "../style";
import IMG from "../place.png";
import { useState } from "react";
import { useEffect } from "react";

import {
  faHeart,
  faShareFromSquare,
} from "@fortawesome/free-regular-svg-icons";
import { gql, useQuery } from "@apollo/client";
import NotFound from "./NotFound";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: ${(props) => (props.fixed ? "0px" : "20px 20px 0px 0px")};
  background-color: #f5f5f5;
  position: relative;
  top: 375px;
  z-index: 2;
  overflow: hidden;
`;

const SContainer = styled.div`
  width: 100%;
  padding: 21px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  margin-bottom: 12px;
`;

const HeaderWrapper = styled(Wrapper)`
  height: 100%;
  padding: 3px 10px 3px 20px;
  justify-content: space-between;
  position: relative;
  flex-direction: row;
`;

const Appbar = styled(SAppbar)`
  z-index: 3;
  color: ${(props) => (props.fixed ? "#000" : "#fff")};
  background-color: ${(props) => (props.fixed ? "#fff" : "transparent")};
  position: fixed;
  max-width: 930px;
`;

const Header = styled.div`
  z-index: 1;
  height: 395px;
  width: 100%;
`;

const Img = styled.div`
  z-index: 1;
  background-image: url(${IMG});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
  height: 395px;
  width: 100%;
  max-width: 930px;
`;

const AppbarTxt = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.01em;

  color: #000000;
`;

const PlaceName = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 26px;
  line-height: 31px;

  color: #1a1a1a;
`;

const SubText = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  color: #1a1a1a;
`;

const VirticalFlex = styled.div`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 20px 0px;
`;

const MenuDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 19px;

  color: #1a1a1a;
`;

const MenuCount = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: #fba20c;
`;

const MenuRates = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 14px;

  color: #aaaaaa;
`;

const MenuRate = styled.span`
  font-weight: 400;
`;

const MenuImg = styled.div`
  width: 120px;
  height: 120px;
  background-color: #121212;
  border-radius: 10px;
`;

const PlaceMap = styled.div`
  width: 334px;
  height: 200px;
  background-color: #eee;
  margin-top: 20px;
`;

const PLACE_QUERY = gql`
  query seePlace($id: Int!) {
    seePlace(id: $id) {
      id
      name
      phoneNumber
      address
      createdAt
      updatedAt
      totalMenu
      totalReview
      businessHour {
        weekday
        open
        close
      }
      subCategories
      menus {
        id
        name
        price
        category
        subCategory
      }
    }
  }
`;

function Place({ history }) {
  const [ScrollY, setScrollY] = useState(0);
  const [ScrollActive, setScrollActive] = useState(false);
  const id = Number(useParams().id);

  useEffect(() => {
    function scrollListener() {
      window.addEventListener("scroll", handleScroll);
    }
    scrollListener();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const { loading, error, data } = useQuery(PLACE_QUERY, {
    variables: {
      id,
    },
  });

  if (loading) return "loading";
  if (error) return "error";

  const place = data.seePlace;

  if (place === null) return <NotFound />;

  function handleScroll() {
    if (ScrollY > 395 - 55 - 20) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }

  console.log(ScrollY);

  function back() {
    history.goBack();
  }

  const MenuList = place.menus.map((menus) => {
    return (
      <Menu key={menus.id}>
        <MenuImg></MenuImg>
        <MenuDetail>
          <span>
            {menus.name}
            <FontAwesomeIcon icon={faStar} color="#FFCE00" />{" "}
            {((menus.taste + menus.cost + menus.visit) / 3).toFixed(1)}
          </span>
          <MenuRates>
            <span>
              맛 <MenuRate>아주 맛있어요 ({menus.taste})</MenuRate>
            </span>
            <span>
              가성비 <MenuRate>좋아요 ({menus.cost})</MenuRate>
            </span>
            <span>
              재방문 <MenuRate>재방문 할래요 ({menus.visit})</MenuRate>
            </span>
          </MenuRates>
          <span>{menus.price}원</span>
        </MenuDetail>
      </Menu>
    );
  });

  return (
    <Container>
      <Wrapper>
        <Header>
          <Img />
        </Header>
        <Appbar fixed={ScrollActive ? "fixed" : ""}>
          <HeaderWrapper>
            <LeftBox>
              <FontAwesomeIcon onClick={back} icon={faChevronLeft} />
            </LeftBox>
            <MiddleBox>
              <AppbarTxt>{ScrollActive && place.name}</AppbarTxt>
            </MiddleBox>
            <RightBox>
              <FontAwesomeIcon icon={faShareFromSquare} />
              <FontAwesomeIcon icon={faHeart} />
            </RightBox>
          </HeaderWrapper>
        </Appbar>
        <Body className="scroll" fixed={ScrollActive ? "fixed" : ""}>
          <SContainer>
            <VirticalFlex>
              <PlaceName>{place.name}</PlaceName>
              <SubText>
                <FontAwesomeIcon icon={faStar} color="#FFCE00" />
              </SubText>
            </VirticalFlex>
          </SContainer>
          <SContainer>
            <SubText>메뉴</SubText> <MenuCount>{place.menus.length}</MenuCount>
            {MenuList}
          </SContainer>
          <SContainer>
            <SubText>매장정보</SubText>
            <PlaceMap />
          </SContainer>
        </Body>
      </Wrapper>
    </Container>
  );
}

export default Place;
