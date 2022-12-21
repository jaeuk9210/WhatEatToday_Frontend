import React, { useState } from "react";
import { useEffect } from "react";
import Picker from "react-scrollable-picker";
import { objectWithoutKey } from "../utils";

function ScrollPicker({ data, setValue, defaultValue, valueName, removeKey }) {
  const [range, setRange] = useState(defaultValue);
  const optionGroups = {
    ...data,
  };

  const handleChange = (name, value) => {
    setRange((rng) => {
      return {
        ...rng,
        [name]: value,
      };
    });
  };

  useEffect(() => {
    setValue(valueName, removeKey ? objectWithoutKey(range, removeKey) : range);
  }, [range, removeKey, setValue, valueName]);

  return (
    <Picker
      optionGroups={optionGroups}
      valueGroups={range}
      onChange={handleChange}
      itemHeight={41}
    />
  );
}

export default ScrollPicker;
