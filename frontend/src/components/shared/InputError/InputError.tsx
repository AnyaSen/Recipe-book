import React, { ReactElement } from "react";

import Styles from "./InputError.module.scss";

interface Props {
  text: string;
}
export default function InputError({ text }: Props): ReactElement {
  return (
    <div className={Styles.InputError} data-cy="input-error">
      <p>{text}</p>
    </div>
  );
}
