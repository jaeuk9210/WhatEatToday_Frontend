import styled from "styled-components";
import { Link } from "react-router-dom";
import route from "../routes";

const Container = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 55px;
`;

const Wrapper = styled.div`
  justify-content: space-around;
  display: flex;
  width: 100%;
  align-items: center;
  max-width: 930px;

  /* Service Colors/Gray Colors/White */
  background: #ffffff;
  box-shadow: 0px -4px 10px rgba(0, 0, 0, 0.06);
  border-radius: 20px 20px 0px 0px;
`;

const Btn = styled(Link)`
  align-items: center;
  background-color: transparent;
`;

const SearchBtn = styled(Btn)`
  position: relative;
  bottom: 20px;
  filter: drop-shadow(0 0 0.5rem rgb(26, 26, 26, 0.1));
`;

function BottomNavigation({ active }) {
  return (
    <Container>
      <Wrapper>
        <Btn to={route.home}>
          <img
            src={`icon/bottomNav/${
              active === "home" ? "home.active" : "home"
            }.svg`}
            alt="home"
          />
        </Btn>
        <Btn to={route.like}>
          <img
            src={`icon/bottomNav/${
              active === "like" ? "like.active" : "like"
            }.svg`}
            alt="like"
          />
        </Btn>
        <SearchBtn to={route.search}>
          <img src="icon/bottomNav/search.svg" alt="search" />
        </SearchBtn>
        <Btn to={route.notification}>
          <img
            src={`icon/bottomNav/${
              active === "notification" ? "notification.active" : "notification"
            }.svg`}
            alt="notification"
          />
        </Btn>
        <Btn to={route.setting}>
          <img
            src={`icon/bottomNav/${
              active === "profile" ? "profile.active" : "profile"
            }.svg`}
            alt="profile"
          />
        </Btn>
      </Wrapper>
    </Container>
  );
}

export default BottomNavigation;
