import React, { ReactElement, RefObject } from "react";

import Styles from "./AdditionalButton.module.scss";

interface Props {
  variant?: string;
  dataCy?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  btnRef?: RefObject<HTMLButtonElement>;
}

export default function AdditionalButton({
  type,
  variant,
  onClick,
  dataCy,
  btnRef
}: Props): ReactElement {
  return (
    <button
      className={variant === "close" ? Styles.ButtonClose : Styles.ButtonPlus}
      type={type}
      onClick={onClick}
      data-cy={dataCy}
      ref={btnRef}
    >
      {variant === "close" ? "x" : "+"}
    </button>
  );
}
