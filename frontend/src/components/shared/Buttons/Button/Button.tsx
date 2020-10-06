import React, { ReactElement } from "react";

import Styles from "./Button.module.scss";
import { Link } from "react-router-dom";

interface Props {
  text: string | undefined;
  withLink?: boolean;
  linkTo?: string;
  disabled?: boolean;
  type?: "button" | "submit";
  onClick?: () => void;
}

export default function Button({
  text,
  withLink,
  linkTo = " ",
  disabled,
  type,
  onClick
}: Props): ReactElement {
  if (withLink)
    return (
      <Link to={linkTo}>
        <button className={Styles.Button}>{text}</button>
      </Link>
    );
  return (
    <button
      className={disabled ? Styles.ButtonDisabled : Styles.Button}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
