export const objectWithoutKey = (object, key) => {
  const { [key]: deletedKey, ...otherKeys } = object;
  return otherKeys;
};

export const convertTimeFormat = (hour, minute, meridiem) => {
  if (meridiem === "PM") {
    hour = hour + 12;
  }
  if (hour === 12 && meridiem === "AM") {
    hour = 0;
  }
  if (hour === 24 && meridiem === "PM") {
    hour = 12;
  }

  return hour * 3600000 + minute * 60000;
};

export const range = (start, end) => {
  let array = [];
  for (let i = start; i < end; ++i) {
    array.push(i);
  }
  return array;
};

export const formatPhoneNumber = (input) => {
  const cleanInput = input.replaceAll(/[^0-9]/g, "");
  let result = "";
  const length = cleanInput.length;
  if (length === 8) {
    result = cleanInput.replace(/(\d{4})(\d{4})/, "$1-$2");
  } else if (cleanInput.startsWith("02") && (length === 9 || length === 10)) {
    result = cleanInput.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3");
  } else if (!cleanInput.startsWith("02") && (length === 10 || length === 11)) {
    result = cleanInput.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  } else {
    result = undefined;
  }

  return result;
};
