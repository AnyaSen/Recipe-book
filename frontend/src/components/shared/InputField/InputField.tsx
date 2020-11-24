import React, { ReactElement } from "react";

import Styles from "./InputField.module.scss";

interface Props {
  placeholder?: string;
  input: React.Component | React.FC;
  small?: boolean;
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
      data-cy="input"
    />
  );
}
