import React, { useState } from "react";
import styled from "styled-components";
import * as Appbar from "../components/Appbar";
import Categories from "../components/Choose/Categories";
import { useForm } from "react-hook-form";
import Price from "../components/Choose/Price";
import BottomSheet from "../components/BottomSheet";
import {
  isShowMinPriceBottomSheetVar,
  isShowMaxPriceBottomSheetVar,
  choicedMinPrice,
  choicedMaxPrice,
  choicedStartTime,
  isShowStartTimeBottomSheetVar,
  choicedEndTime,
  isShowEndTimeBottomSheetVar,
} from "../apollo";
import ScrollPicker from "../components/ScrollPicker";
import Time from "../components/Choose/Time";
import _range from "lodash/range";
import Delivery from "../components/Choose/Delivery";
import Distense from "../components/Choose/Distense";
import {
  SolidButton as Button,
  SolidIButton as InputButton,
} from "../components/Buttons";

const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SolidButton = styled(Button)`
  position: fixed;
`;

const SolidIButton = styled(InputButton)`
  position: fixed;
`;

function Choose({ history }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
  } = useForm({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const [formStep, setFromStep] = useState(0);

  const completeFormStep = () => {
    setFromStep((crr) => crr + 1);
  };

  const renderButton = () => {
    if (formStep > 4) {
      return undefined;
    } else if (formStep === 4) {
      return <SolidIButton value="다음으로" />;
    } else {
      return (
        <SolidButton onClick={completeFormStep} type="button">
          다음으로
        </SolidButton>
      );
    }
  };

  const onSubmit = () => {
    const value = getValues();
    alert(JSON.stringify(value));
  };

  const IndicatorBox = styled.div`
    width: 100%;
    height: 4px;

    background: #f7f7f7;
    border: 0.5px solid #f1f1f1;
    border-radius: 500px;
  `;

  const Indicator = styled.div`
    position: relative;
    width: ${(100 / 5) * (formStep + 1)}%;
    height: 4px;

    background: #fba20c;
    border: 0.5px solid #f1f1f1;
    border-radius: 500px;
  `;

  const minPrice = {
    price: _range(0, 11).map((i) => ({
      value: i * 1000,
      label: (i * 1000).toLocaleString("ko-KR"),
    })),
  };

  const maxPrice = {
    price: _range(0, 11).map((i) => ({
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

  return (
    <Container>
      <Appbar.AppbarBox>
        <Appbar.AppbarLeft>
          <button
            onClick={() => {
              if (formStep === 0) {
                history.goBack();
              } else {
                setFromStep((crr) => crr - 1);
              }
            }}
          >
            <img src="icon/back.svg" alt="back" />
          </button>
        </Appbar.AppbarLeft>
        <Appbar.AppbarCenter>
          <div>
            <div>현재위치는</div>
            <div>안동 용상</div>
          </div>
        </Appbar.AppbarCenter>
        <Appbar.AppbarRight />
      </Appbar.AppbarBox>
      <Body>
        <IndicatorBox>
          <Indicator />
        </IndicatorBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formStep === 0 && <Categories register={register} />}
          {formStep === 1 && <Price setValue={setValue} />}
          {formStep === 2 && <Time setValue={setValue} />}
          {formStep === 3 && <Delivery register={register} />}
          {formStep === 4 && <Distense register={register} />}
          {renderButton()}
        </form>
      </Body>
      <BottomSheet reactVar={isShowMinPriceBottomSheetVar}>
        <ScrollPicker
          data={minPrice}
          reactVar={choicedMinPrice}
          setValue={setValue}
          valueName="minPrice"
        />
      </BottomSheet>
      <BottomSheet reactVar={isShowMaxPriceBottomSheetVar}>
        <ScrollPicker
          data={maxPrice}
          reactVar={choicedMaxPrice}
          setValue={setValue}
          valueName="maxPrice"
        />
      </BottomSheet>
      <BottomSheet reactVar={isShowStartTimeBottomSheetVar}>
        <ScrollPicker
          data={startTime}
          reactVar={choicedStartTime}
          setValue={setValue}
          valueName="startTime"
          removeKey="divider"
        />
      </BottomSheet>
      <BottomSheet reactVar={isShowEndTimeBottomSheetVar}>
        <ScrollPicker
          data={endTime}
          reactVar={choicedEndTime}
          setValue={setValue}
          valueName="endTime"
          removeKey="divider"
        />
      </BottomSheet>
    </Container>
  );
}

export default Choose;
