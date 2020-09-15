import React, { ReactElement } from "react";

import Styles from "./ErrorPage.module.scss";

import Layout from "../../Layout";
import sad_cook from "../../../assets/img/sad_cook.svg";

export default function ErrorPage(): ReactElement {
  return (
    <Layout>
      <div className={Styles.ErrorPage}>
        <img src={sad_cook} alt="error" />
        <h2>Sorry, an error has occured.</h2>
      </div>
    </Layout>
  );
}
