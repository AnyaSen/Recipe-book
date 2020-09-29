import React, { ReactElement } from "react";

import Styles from "./TextArea.module.scss";
import { placeholder } from "@babel/types";

interface Props {
  input: any;
  placeholder: string;
}

export default function TextArea({ input, placeholder }: Props): ReactElement {
  return (
    <textarea
      placeholder={placeholder}
      rows="5"
      cols="100"
      className={Styles.TextArea}
      {...input}
    />
  );
}
