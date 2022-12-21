import styled from "styled-components";
import CheckBox from "../../components/CheckBox";
import { useForm } from "react-hook-form";
import { SolidIButton } from "../../components/Buttons";
import useWindowSize from "../../hooks/useWindowSize";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useHistory, useLocation } from "react-router-dom";
import { H2, Hightlight } from "../../style";
import NotFound from "../NotFound";
import route from "../../routes";

const schema = yup.object({
  subCategory: yup.array().min(1, "최소 1개 이상 선택해 주시길 바랍니다."),
});

const CheckBoxs = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  flex-direction: center;
  align-items: center;
  width: ${(props) => props.width || 592}px;
`;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const Wrapper = styled.div`
  display: flex;
  max-width: 930px;
  width: 100%;
  height: 100%;
  background: #fff;
  align-items: center;
  flex-direction: column;
`;

const Title = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 25px;
  padding-left: 20px;
`;

const InputButton = styled(SolidIButton)`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
`;

function Subcategory() {
  const history = useHistory();
  const windowWidth = useWindowSize().width - 44;
  const location = useLocation();
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
    watch,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(schema),
    defaultValues: {
      subCategory: [],
    },
  });

  const data = location.state?.data;

  const onSubmit = () => {
    const value = getValues();
    history.push(route.choose + "/result", { value, data });
  };

  if (!data) {
    return <NotFound />;
  }

  const subCategories = [
    ...new Set(data.conditionSearchMenu.map((i) => i["subCategories"]).flat()),
  ];

  const col =
    windowWidth >= 565
      ? subCategories.length >= 7
        ? 7
        : subCategories.length
      : parseInt(windowWidth / 81) > subCategories.length
      ? subCategories.length
      : parseInt(windowWidth / 81);

  const flexboxWidth = col * 76 + (col - 1) * 10;

  console.log(windowWidth, col, data);

  const Menus =
    subCategories.length === 0 ? (
      <>
        결과가 없습니다.
        <br />
        검색 옵션을 바꿔서 다시 시도해 주시길 바랍니다.
      </>
    ) : (
      subCategories.map((menu, index) => {
        return (
          <CheckBox
            key={index}
            name={menu}
            id="subCategory"
            value={menu}
            register={register}
            textSize="15px"
            textColor="#AAA"
            check={watch("subCategory", "").includes(menu)}
            width="76px"
            height="76px"
          />
        );
      })
    );

  return (
    <Container>
      <Wrapper>
        <Title>
          <H2>
            <Hightlight>오늘의 메뉴</Hightlight>
            <br />
            추천드립니다
          </H2>
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CheckBoxs width={flexboxWidth}>{Menus}</CheckBoxs>
          <InputButton value="관련 식당 찾기" disabled={!isValid} />
        </form>
      </Wrapper>
    </Container>
  );
}

export default Subcategory;
