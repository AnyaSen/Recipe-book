import React, { ReactElement } from "react";

import Styles from "./Button.module.scss";
import { Link } from "react-router-dom";

interface Props {
  text: string;
  withLink?: boolean;
  linkTo?: string;
}

export default function Button({
  text,
  withLink,
  linkTo = " "
}: Props): ReactElement {
  if (withLink)
    return (
      <Link to={linkTo}>
        <button className={Styles.Button}>{text}</button>
      </Link>
    );
  return <button className={Styles.Button}>{text}</button>;
}
