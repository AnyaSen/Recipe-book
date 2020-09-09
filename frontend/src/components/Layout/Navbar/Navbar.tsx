import React, { ReactElement } from "react";
import { NavLink } from "react-router-dom";

import Styles from "./Navbar.module.scss";
import logoSvg from "../../../assets/img/logo.svg";

export default function Navbar(): ReactElement {
  return (
    <div className={Styles.Navbar}>
      <NavLink exact to="/" className={Styles.logo}>
        <img src={logoSvg} alt="Anna Senchikhina" />
      </NavLink>
    </div>
  );
}
