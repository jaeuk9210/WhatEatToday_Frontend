import styled from "styled-components";
import Avatar from "../components/Avatar";
import useUser from "../hooks/useUser";
import {
  Box as SBox,
  Container as SContainer,
  Wrapper as SWrapper,
} from "../style";
import { useHistory } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import SettingMenu from "../data/SettingMenu";

const Wrapper = styled(SWrapper)`
  flex-direction: column;
`;

const Info = styled.div`
  height: fit-content;
  margin: 12px;
`;

const Title = styled.span`
  display: block;
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 22px;
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #000000;
`;

const Email = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  letter-spacing: -0.01em;

  color: #555555;
  margin-top: 5px;
`;

const Box = styled(SBox)`
  display: flex;
  flex-direction: column;
`;

const Menu = styled.li`
  height: 50px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

const Menus = styled.ul`
  margin-top: 10px;
`;

const MenuText = styled.span`
  font-family: "Pretendard";
  font-style: normal;
  font-weight: 500;
  font-size: 15px;
  line-height: 18px;
  /* identical to box height */

  color: #1a1a1a;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const Container = styled(SContainer)`
  overflow: scroll;
  overflow-x: hidden;
`;

const Setting = () => {
  const history = useHistory();
  const { data } = useUser();

  const menuList = SettingMenu.menuGroups.map((menus) => {
    const menu = menus.menus.map((v) => (
      <Menu onClick={() => history.push(v.link)}>
        <MenuText>{v.title}</MenuText>
      </Menu>
    ));

    return (
      <Box>
        <Title>{menus.title}</Title>
        <Menus>{menu}</Menus>
      </Box>
    );
  });

  return (
    <Container>
      <PageTitle title="설정" />
      <Wrapper>
        <Box>
          <Profile>
            <Avatar url={data?.me?.avatar} size={"55px"} />
            <Info>
              <Title>{data?.me?.username}</Title>
              <Email>{data?.me?.email}</Email>
            </Info>
          </Profile>
        </Box>
        {menuList}
      </Wrapper>
    </Container>
  );
};

export default Setting;
