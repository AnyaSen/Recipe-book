import React, { ReactElement } from "react";

import Styles from "./SecondaryButton.module.scss";

interface Props {
  text: string | undefined;
  pink?: boolean;
  type?: "button" | "submit";
  onClick(): void;
}

export default function SecondaryButton({
  text,
  type,
  pink,
  onClick
}: Props): ReactElement {
  return (
    <button
      className={pink ? Styles.ButtonPink : Styles.Button}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
