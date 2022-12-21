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
