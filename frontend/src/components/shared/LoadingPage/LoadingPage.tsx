import React, { ReactElement } from "react";

import Styles from "./LoadingPage.module.scss";

import Layout from "../../Layout";
import happy_cook from "../../../assets/img/happy_cook.svg";

export default function LoadingPage(): ReactElement {
  return (
    <Layout>
      <div className={Styles.LoadingPage}>
        <img src={happy_cook} alt="loading" />
        <h2>Loading...</h2>
      </div>
    </Layout>
  );
}
