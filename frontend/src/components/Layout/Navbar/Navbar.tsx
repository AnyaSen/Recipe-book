import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import Styles from "./Navbar.module.scss";
import logoSvg from "../../../assets/img/logo.svg";
import Button from "../../shared/Button";

interface Props {
  buttonText: string;
  linkTo?: string;
  withLink?: boolean;
}

export default function Navbar({
  buttonText,
  withLink,
  linkTo
}: Props): ReactElement {
  return (
    <div className={Styles.Navbar}>
      <NavLink exact to="/" className={Styles.logo}>
        <img src={logoSvg} alt="Recipe Book" />
      </NavLink>

      <Button text={buttonText} withLink={withLink} linkTo={linkTo} />
    </div>
  );
}
