import React, { ReactElement } from "react";

import Styles from "./TextArea.module.scss";

interface Props {
  input: any;
  placeholder: string;
}

export default function TextArea({ input, placeholder }: Props): ReactElement {
  return (
    <textarea
      placeholder={placeholder}
      className={Styles.TextArea}
      {...input}
    />
  );
}
