import { faBars, faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../hooks/useUser";
import route from "../routes";
import { Container, Wrapper } from "../style";
import Avatar from "./Avatar";
import Header from "./header";
import Location from "./location";
import BottomNavigation from "../components/BottomNavigation";

const MoreBtn = styled(Link)`
  width: 40px;
  height: 40px;
  display: flex;
  color: inherit;
  align-items: center;
  justify-content: center;
`;

const MidTitle = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  text-align: center;
  letter-spacing: -0.01em;
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

const Space = styled.div`
  height: 55px;
`;

function Layout({ children, path, title, history }) {
  const { data } = useUser();

  const back = () => {
    history.goBack();
  };

  switch (path) {
    case "home":
      return (
        <Container>
          <Wrapper>
            <Header
              left={(props) => (
                <>
                  <Avatar url={data?.me?.avatar} />
                  <Location />
                </>
              )}
              right={(props) => (
                <>
                  <MoreBtn to={route.setting}>
                    <FontAwesomeIcon icon={faBars} size={"lg"} />
                  </MoreBtn>
                </>
              )}
            />
            {children}
            <Space />
            <BottomNavigation active="home" />
          </Wrapper>
        </Container>
      );
    case "welcome":
      return (
        <Container>
          <Wrapper>
            <Header right={(props) => <TextBtn>건너뛰기</TextBtn>} />
            {children}
          </Wrapper>
        </Container>
      );
    default:
      return (
        <Container>
          <Wrapper>
            <Header
              left={(props) => (
                <FontAwesomeIcon onClick={back} icon={faChevronLeft} />
              )}
              middle={(props) => <MidTitle>{title}</MidTitle>}
            />
            {children}
          </Wrapper>
        </Container>
      );
  }
}

export default Layout;
