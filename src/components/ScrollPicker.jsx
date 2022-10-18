import { useReactiveVar } from "@apollo/client";
import React from "react";
import Picker from "react-scrollable-picker";
import { objectWithoutKey } from "../utils";

function ScrollPicker({ data, reactVar, setValue, valueName, removeKey }) {
  const range = useReactiveVar(reactVar);
  const optionGroups = {
    ...data,
  };

  const handleChange = async (name, value) => {
    const result = await reactVar({
      ...range,
      [name]: value,
    });
    setValue(
      valueName,
      removeKey ? objectWithoutKey(result, removeKey) : result
    );
  };

  return (
    <Picker
      optionGroups={optionGroups}
      valueGroups={range}
      onChange={handleChange}
    />
  );
}

export default ScrollPicker;
