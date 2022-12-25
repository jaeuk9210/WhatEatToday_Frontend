import { gql, useMutation } from "@apollo/client";
import { range } from "lodash";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { SolidIButton } from "../../components/Buttons";
import RadioInput from "../../components/RadioInput";
import SelectInput from "../../components/SelectInput";
import Textinput from "../../components/Textinput";
import route from "../../routes";
import { Container, Wrapper as SWrapper } from "../../style";

const Wrapper = styled(SWrapper)`
  background-color: #fff;
`;

const Name = styled.div`
  display: flex;
  width: 100%;
  gap: 11px;
  align-items: flex-end;
`;

const Lastname = styled(Textinput)`
  flex-basis: 97px;
`;

const Firstname = styled(Textinput)`
  flex-basis: 226px;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  padding: 30px 21px 0px 21px;
  flex-direction: column;
  gap: 30px;
`;

const Birth = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;

const NumberInput = styled(Textinput)`
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;

    margin: 0;
  }
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const yearOption = [
  { value: "", name: "출생년도" },
  ...range(new Date().getFullYear() - 120, new Date().getFullYear()).map(
    (year) => {
      return { value: year, name: year + "년" };
    }
  ),
];

const monthOption = [
  { value: "", name: "월" },
  ...range(1, 13).map((month) => {
    return { value: month, name: month + "월" };
  }),
];

const dayOption = [
  { value: "", name: "일" },
  ...range(1, 32).map((day) => {
    return { value: day, name: day + "일" };
  }),
];

const Send_Phone_Verification_Mutaion = gql`
  mutation sendPhoneVerification($phone: String!) {
    sendPhoneVerification(phone: $phone) {
      ok
      error
    }
  }
`;

const ADD_ADDITIONAL_INFO_MUTAION = gql`
  mutation addAdditionalInfo(
    $id: Int!
    $firstName: String!
    $lastName: String!
    $gender: Gender!
    $phone: String!
    $birth: String!
    $code: String!
  ) {
    addAdditionalInfo(
      id: $id
      firstName: $firstName
      lastName: $lastName
      gender: $gender
      phone: $phone
      birth: $birth
      code: $code
    ) {
      ok
      error
    }
  }
`;

function AdditionalInfo() {
  const history = useHistory();
  const location = useLocation().state;

  const [sendedVerificationCode, setSendedVerficationCode] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    clearErrors,
    watch,
    setError,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      gender: "",
    },
  });

  const [sendVerification, { loading: codeSendLoading, error: codeSendError }] =
    useMutation(Send_Phone_Verification_Mutaion, {
      onCompleted: (data) => {
        const {
          sendPhoneVerification: { ok, error },
        } = data;

        if (!ok) {
          return setError("phone", {
            message: error,
          });
        }
        setSendedVerficationCode(true);
      },
    });

  const [addInfo, { loading: addInfoLoading, error: addInfoError }] =
    useMutation(ADD_ADDITIONAL_INFO_MUTAION, {
      onCompleted: (data) => {
        const {
          addAdditionalInfo: { ok, error },
        } = data;

        console.log(ok);

        if (!ok) {
          return setError("code", {
            message: error,
          });
        } else {
          history.push(route.home);
        }
      },
    });

  const addAdditionalInfoFunc = () => {
    if (codeSendLoading || addInfoLoading) {
      return;
    }
    if (addInfoError) {
      console.log(addInfoError);
    }
    const value = getValues();
    value.phone = "+82" + Number(value.phone);
    console.log(value);
    if (sendedVerificationCode === false) {
      sendVerification({
        variables: {
          phone: value.phone,
        },
      });
    } else {
      const birth = new Date(`${value.year}-${value.month}-${value.day}`);
      addInfo({
        variables: {
          id: location.id,
          firstName: value.firstName,
          lastName: value.lastName,
          gender: value.gender,
          phone: value.phone,
          birth: birth,
          code: value.code,
        },
      });
    }
  };

  return (
    <Container>
      <Wrapper>
        <Form onSubmit={handleSubmit(addAdditionalInfoFunc)}>
          <Name>
            <Lastname
              id="lastName"
              validationSchema={{
                required: "Lastname is required",
                onChange() {
                  clearErrors("result");
                },
              }}
              register={register}
              errors={errors}
              title="성명"
              type="text"
              placeholder="성"
            />
            <Firstname
              id="firstName"
              validationSchema={{
                required: "Firstname is required",
                onChange() {
                  clearErrors("result");
                },
              }}
              register={register}
              errors={errors}
              type="text"
              placeholder="이름"
            />
          </Name>
          <RadioInput
            title="성별"
            id="gender"
            options={[
              { key: "male", value: "남성" },
              { key: "female", value: "여성" },
            ]}
            register={register}
            validationSchema={{
              required: "gender is required",
              onChange() {
                clearErrors("result");
              },
            }}
            errors={errors}
            watch={watch}
          />
          <Birth>
            <SelectInput
              title={"생년월일"}
              id="year"
              validationSchema={{
                required: "year is required",
                onChange() {
                  clearErrors("result");
                },
              }}
              register={register}
              errors={errors}
              options={yearOption}
            />
            <SelectInput
              id="month"
              validationSchema={{
                required: "month is required",
                onChange() {
                  clearErrors("result");
                },
              }}
              register={register}
              errors={errors}
              options={monthOption}
            />
            <SelectInput
              id="day"
              validationSchema={{
                required: "day is required",
                onChange() {
                  clearErrors("result");
                },
              }}
              register={register}
              errors={errors}
              options={dayOption}
            />
          </Birth>
          <Textinput
            id="phone"
            validationSchema={{
              required: "Phone Number is required",
              onChange() {
                clearErrors("result");
              },
            }}
            register={register}
            errors={errors}
            type="tel"
            placeholder="전화번호"
            title="전화번호"
          />
          <SolidIButton value="인증번호 요청" />
          {sendedVerificationCode && (
            <>
              <NumberInput
                id="code"
                validationSchema={{
                  required: "Code is required",
                  onChange() {
                    clearErrors("result");
                  },
                }}
                register={register}
                errors={errors}
                type="number"
                placeholder="인증번호 입력"
                title="인증번호"
              />
              <SolidIButton value="가입하기" />
            </>
          )}
        </Form>
      </Wrapper>
    </Container>
  );
}

export default AdditionalInfo;
