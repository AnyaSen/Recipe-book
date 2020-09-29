import React, { ReactElement } from "react";

import Styles from "./AdditionalButton.module.scss";

interface Props {
  variant?: string;
  type?: "button" | "submit";
  onClick(): void;
}

export default function AdditionalButton({
  type,
  variant,
  onClick
}: Props): ReactElement {
  return (
    <button
      className={variant === "close" ? Styles.ButtonClose : Styles.ButtonPlus}
      type={type}
      onClick={onClick}
    >
      {variant === "close" ? "x" : "+"}
    </button>
  );
}
