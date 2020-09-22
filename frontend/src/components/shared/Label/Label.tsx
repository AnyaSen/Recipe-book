import React, { ReactElement } from "react";

import Styles from "./Label.module.scss";

interface Props {
  text: string;
}
export default function Label({ text }: Props): ReactElement {
  return (
    <div className={Styles.Label}>
      <p>{text}</p>
    </div>
  );
}
