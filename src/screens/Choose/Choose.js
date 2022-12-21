import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import styled from "styled-components";
import Categories from "../../components/Choose/Categories";
import { useForm } from "react-hook-form";
import Price from "../../components/Choose/Price";
import BottomSheet from "../../components/BottomSheet";
import {
  isShowMinPriceBottomSheetVar,
  isShowMaxPriceBottomSheetVar,
  isShowStartTimeBottomSheetVar,
  isShowEndTimeBottomSheetVar,
} from "../../apollo";
import ScrollPicker from "../../components/ScrollPicker";
import Time from "../../components/Choose/Time";
import _range from "lodash/range";
import Delivery from "../../components/Choose/Delivery";
import Distanse from "../../components/Choose/Distanse";
import { SolidButton, SolidIButton } from "../../components/Buttons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PageTitle from "../../components/PageTitle";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Header from "../../components/header";
import Location from "../../components/location";
import { convertTimeFormat } from "../../utils";
import route from "../../routes";
import { gql, useLazyQuery } from "@apollo/client";

const schema = yup.object({
  categories: yup.array().min(1, "최소 1개 이상 선택해 주시길 바랍니다."),
  minPrice: yup.object().required("최소 금액을 선택해 주시길 바랍니다."),
  maxPrice: yup.object().required("초대 금액을 선택해 주시길 바랍니다."),
  startTime: yup.object().required("시작 시각을 선택해 주시길 바랍니다."),
  endTime: yup.object().required("끝 시각을 선택해 주시길 바랍니다."),
  delivery: yup.array().min(1, "최소 1개 이상 선택해 주시길 바랍니다."),
  distanse: yup.array().min(1, "최소 1개 이상 선택해 주시길 바랍니다."),
});

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  overflow: scroll;
  height: 100%;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow: scroll;
`;

const IndicatorBox = styled.div`
  width: 100%;
  height: 4px;
  background: #f7f7f7;
  border: 0.5px solid #f1f1f1;
  border-radius: 500px;
`;

const Indicator = styled.div`
  position: relative;
  width: ${(props) => (100 / 5) * (props.formStep + 1)}%;
  height: 4px;

  background: #fba20c;
  border: 0.5px solid #f1f1f1;
  border-radius: 500px;
`;

const InputButton = styled(SolidIButton)`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Button = styled(SolidButton)`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 0);
`;

const Space = styled.div`
  height: 55px;
`;

const SEARCH_QUERY = gql`
  query ConditionSearchMenu(
    $categories: [String]!
    $minPrice: Int
    $maxPrice: Int
    $startTime: Int
    $endTime: Int
    $delivery: [String]
    $distanse: [String]
  ) {
    conditionSearchMenu(
      categories: $categories
      minPrice: $minPrice
      maxPrice: $maxPrice
      startTime: $startTime
      endTime: $endTime
      delivery: $delivery
      distanse: $distanse
    ) {
      id
      name
      subCategories
      totalMenu
      totalReview
    }
  }
`;

function Choose({ history }) {
  const { register, handleSubmit, getValues, setValue, watch } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
    defaultValues: {
      categories: [],
      minPrice: { price: 8000 },
      maxPrice: { price: 100000 },
      startTime: { hour: 9, minute: 0, meridiem: "AM" },
      endTime: { hour: 11, minute: 0, meridiem: "PM" },
      delivery: [],
      distanse: [],
    },
    resolver: yupResolver(schema),
  });

  const [formStep, setFromStep] = useState(0);

  const [getSearchResult] = useLazyQuery(SEARCH_QUERY, {
    onCompleted: (data) => {
      history.push(route.choose + "/subcategory", { data });
    },
  });

  let isPageValid;
  switch (formStep) {
    case 0:
      isPageValid = watch("categories", "").length > 0;
      break;
    case 1:
      isPageValid = watch("minPrice") && watch("maxPrice");
      break;
    case 2:
      isPageValid = watch("startTime") && watch("endTime");
      break;
    case 3:
      isPageValid = watch("delivery", "").length > 0;
      break;
    case 4:
      isPageValid = watch("distanse", "").length > 0;
      break;
    default:
      break;
  }
  const completeFormStep = async () => {
    if (isPageValid) {
      setFromStep((crr) => crr + 1);
    }
  };

  const renderButton = () => {
    if (formStep > 4) {
      return undefined;
    } else if (formStep === 4) {
      return <InputButton value="다음으로" disabled={!isPageValid} />;
    } else {
      return (
        <Button
          onClick={completeFormStep}
          type="button"
          disabled={!isPageValid}
        >
          다음으로
        </Button>
      );
    }
  };

  const onSubmit = () => {
    const value = getValues();
    value.minPrice = value.minPrice.price;
    value.maxPrice = value.maxPrice.price;
    value.startTime = convertTimeFormat(
      value.startTime.hour,
      value.startTime.minute,
      value.startTime.meridiem
    );
    value.endTime = convertTimeFormat(
      value.endTime.hour,
      value.endTime.minute,
      value.endTime.meridiem
    );
    //alert(JSON.stringify(value));
    getSearchResult({ variables: value });

    //history.push(route.cart, { value });
  };

  const minPrice = {
    price: _range(0, 11).map((i) => ({
      value: i * 1000,
      label: (i * 1000).toLocaleString("ko-KR"),
    })),
  };

  const maxPrice = {
    price: _range(0, 16).map((i) => ({
      value: i * 10000,
      label: (i * 10000).toLocaleString("ko-KR"),
    })),
  };

  const startTime = {
    hour: _range(1, 13).map((i) => ({
      value: i,
      label: i.toString().padStart(2, "0"),
    })),
    divider: [{ value: ":", label: ":" }],
    minute: _range(0, 12).map((i) => ({
      value: i * 5,
      label: (i * 5).toString().padStart(2, "0"),
    })),
    meridiem: [
      { value: "AM", label: "AM" },
      { value: "PM", label: "PM" },
    ],
  };

  const endTime = {
    hour: _range(1, 13).map((i) => ({
      value: i,
      label: i.toString().padStart(2, "0"),
    })),
    divider: [{ value: ":", label: ":" }],
    minute: _range(0, 12).map((i) => ({
      value: i * 5,
      label: (i * 5).toString().padStart(2, "0"),
    })),
    meridiem: [
      { value: "AM", label: "AM" },
      { value: "PM", label: "PM" },
    ],
  };

  const back = () => {
    if (formStep >= 1) {
      setFromStep((crr) => crr - 1);
    } else {
      history.goBack();
    }
  };

  return (
    <Container>
      <PageTitle title="메뉴 선택" />
      <Wrapper>
        <Header
          left={(props) => (
            <div onClick={back}>
              <FontAwesomeIcon icon={faChevronLeft} />
            </div>
          )}
          middle={(props) => (
            <>
              <Location />
            </>
          )}
        />
        <Body>
          <IndicatorBox>
            <Indicator formStep={formStep} />
          </IndicatorBox>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formStep === 0 && <Categories register={register} watch={watch} />}
            {formStep === 1 && <Price setValue={setValue} watch={watch} />}
            {formStep === 2 && <Time setValue={setValue} watch={watch} />}
            {formStep === 3 && <Delivery register={register} watch={watch} />}
            {formStep === 4 && <Distanse register={register} watch={watch} />}
            <Space />
            {renderButton()}
          </form>
        </Body>
      </Wrapper>
      <BottomSheet reactVar={isShowMinPriceBottomSheetVar}>
        <ScrollPicker
          data={minPrice}
          defaultValue={watch("minPrice", [])}
          setValue={setValue}
          valueName="minPrice"
        />
      </BottomSheet>
      <BottomSheet reactVar={isShowMaxPriceBottomSheetVar}>
        <ScrollPicker
          data={maxPrice}
          defaultValue={watch("maxPrice", [])}
          setValue={setValue}
          valueName="maxPrice"
        />
      </BottomSheet>
      <BottomSheet reactVar={isShowStartTimeBottomSheetVar}>
        <ScrollPicker
          data={startTime}
          defaultValue={watch("startTime", [])}
          setValue={setValue}
          valueName="startTime"
          removeKey="divider"
        />
      </BottomSheet>
      <BottomSheet reactVar={isShowEndTimeBottomSheetVar}>
        <ScrollPicker
          data={endTime}
          defaultValue={watch("endTime", [])}
          setValue={setValue}
          valueName="endTime"
          removeKey="divider"
        />
      </BottomSheet>
    </Container>
  );
}

export default Choose;
