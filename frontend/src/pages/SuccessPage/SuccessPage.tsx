import React, { ReactElement } from "react";

import Styles from "./SuccessPage.module.scss";
import successSvg from "../../assets/img/success.svg";

import Layout from "../../components/Layout";
import Button from "../../components/shared/Buttons/Button";

export default function SuccessPage(): ReactElement {
  return (
    <Layout>
      <div className={Styles.SuccessMessage}>
        <img src={successSvg} alt="success" />
        <h2>Your recipe has been successfully uploaded!</h2>
        <Button withLink linkTo="/" text="To the recipes" />
      </div>
    </Layout>
  );
}
