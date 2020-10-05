export const required = (value: string | number) => {
  if (!value || value === "") {
    return "required";
  }
};

export const requiredNumber = (value: any) => {
  const isNotNumber = isNaN(Number(value));

  if (!value || value === "") {
    return "required";
  } else if (isNotNumber) {
    return "number";
  }
};
