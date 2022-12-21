import { useParams } from "react-router-dom";
import { Container, Wrapper } from "../style";
import placeData from "../data/place";
import { SolidIButton } from "../components/Buttons";
import BottomSheet from "../components/BottomSheet";
import { isShowStoryBottomSheetVar } from "../apollo";
import styled from "styled-components";

const Post = styled.div`
  width: 125px;
  height: 125px;
  background-color: #eee;
  border: 1px solid #ffffff;
`;

const Posts = styled.div`
  width: fit-content;
  display: flex;
  flex-wrap: wrap;
`;

function Story() {
  const placeId = useParams().placeid;
  const place = placeData.find((e) => e.id === Number(placeId));

  return (
    <Container>
      <Wrapper>
        {place.name}
        <Posts></Posts>
        <SolidIButton
          onClick={() => isShowStoryBottomSheetVar(true)}
          value={"스토리 올리기"}
        />
      </Wrapper>
      <BottomSheet reactVar={isShowStoryBottomSheetVar}>
        <div>스토리 올리기</div>
        <div>삭제하기</div>
      </BottomSheet>
    </Container>
  );
}

export default Story;
