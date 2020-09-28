export const required = (value: string | number) => {
  if (!value || value === "") {
    return "This field is required";
  }
};
