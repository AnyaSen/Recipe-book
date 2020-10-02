export const required = (value: string | number) => {
  if (!value || value === "") {
    return "required";
  }
};
