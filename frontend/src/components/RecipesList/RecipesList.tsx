import React, { ReactElement } from "react";

import Styles from "./RecipesList.module.scss";
import Recipe from "../Recipe/Recipe";
import Layout from "../Layout";

export default function RecipesList(): ReactElement {
  return (
    <div className={Styles.RecipesList}>
      <Layout>
        <Recipe name="Cake" />
        <Recipe name="Pasta" />
      </Layout>
    </div>
  );
}
