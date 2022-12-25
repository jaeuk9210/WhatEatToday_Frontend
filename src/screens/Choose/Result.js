import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { H1, H2, Hightlight, Wrapper, Box as Container } from "../../style";
import route from "../../routes";

const Title = styled.div`
  display: flex;
  align-items: center;
`;

const Box = styled(Link)`
  display: flex;
  padding: 15px;

  width: 100%;
  background: #ffffff;
  border: 1px solid #f1f1f1;
  /* shadow 1 */

  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.02);
  border-radius: 10px;
`;

// const Container = styled.div`
//   width: 100%;
//   padding: 21px;
//   background-color: #fff;
//   border-bottom: 1px solid #eee;
//   margin-bottom: 12px;
//   display: flex;
//   flex-direction: column;
// `;

const TotalPlace = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 17px;
  /* identical to box height */

  color: ${(props) => props.theme.accentColor};

  margin-left: 3px;
`;

const TotalReview = styled.span`
  font-weight: 500;
  font-size: 13px;
  line-height: 18px;
  /* identical to box height, or 138% */

  letter-spacing: -0.03em;

  color: #aaaaaa;
`;

const TotalMenu = styled.span`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;

  color: #999999;
`;

const PlaceImg = styled.div`
  margin-right: 15px;
  width: 70px;
  height: 70px;

  border-radius: 50%;
  border: 1px solid #f1f1f1;
`;

const Info = styled.span`
  display: flex;
  flex-direction: column;

  gap: 5px;
`;

const SubCategoryList = styled.div`
  display: flex;
  flex-direction: column;

  gap: 40px;
`;

const PlaceList = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

function Result() {
  const {
    state: {
      value: { subCategory: subCategories },
      data: { conditionSearchMenu: data },
    },
  } = useLocation();
  console.log(data);
  const result = subCategories.map((subCategory) => {
    return {
      subCategory: subCategory,
      places: data.filter((a) => a.subCategories.includes(subCategory)),
    };
  });
  const SubCategories = result.map((i) => {
    const Places = i.places.map((place) => {
      return (
        <Box to={route.place + "/" + place.id}>
          <PlaceImg />
          <Info>
            <H1>{place.name}</H1>
            <TotalReview>리뷰 {place.totalReview}개</TotalReview>
            <TotalMenu>메뉴 {place.totalMenu}개</TotalMenu>
          </Info>
        </Box>
      );
    });
    return (
      <div>
        <Title>
          <H1>{i.subCategory}</H1>
          <TotalPlace> {i.places.length}</TotalPlace>
        </Title>
        <PlaceList>{Places}</PlaceList>
      </div>
    );
  });

  return (
    <Wrapper>
      <Container>
        <H2>
          <Hightlight>관련 식당</Hightlight>
          <br />
          리스트입니다
        </H2>
      </Container>
      <Container>
        <SubCategoryList>{SubCategories}</SubCategoryList>
      </Container>
    </Wrapper>
  );
}

export default Result;
