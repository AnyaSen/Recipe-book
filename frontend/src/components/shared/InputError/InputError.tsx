import React, { ReactElement } from "react";

import Styles from "./InputError.module.scss";

interface Props {
  text: string;
}
export default function InputError({ text }: Props): ReactElement {
  return (
    <div className={Styles.InputError}>
      <p>{text}</p>
    </div>
  );
}
