import React, { ReactElement } from "react";

import Styles from "./InputField.module.scss";

interface Props {
  placeholder?: string;
  input: object;
  small: boolean;
}

export default function InputField({
  placeholder,
  input,
  small
}: Props): ReactElement {
  return (
    <input
      className={small ? Styles.InputFieldSmall : Styles.InputField}
      placeholder={placeholder}
      {...input}
    />
  );
}
