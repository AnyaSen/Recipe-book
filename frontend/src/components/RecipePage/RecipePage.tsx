import React, { ReactElement } from "react";

import Styles from "./RecipePage.module.scss";
import { RouteComponentProps } from "react-router";
import Layout from "../Layout";

interface MatchParams {
  id: string | undefined;
}

interface Props extends RouteComponentProps<MatchParams> {}

export default function RecipePage({ match }: Props): ReactElement {
  const { id } = match.params;

  return (
    <Layout buttonText="Back to all" withLink linkTo="/">
      <div className={Styles.RecipePage}>
        <div className={Styles.RecipeHeader}>
          <div>
            <h1>Name {id}</h1>
            <img src="" alt="some alt" />
            <p>20min</p>
            <p>8 portions</p>
          </div>
          <div>
            <h2>Ingredients</h2>
            <p>2 eggs</p>
            <p>250ml milk</p>
            <p>20gr butter</p>
          </div>
        </div>
        <div className={Styles.preparation}>
          <h2>Preparation</h2>
          <h3>Step 1</h3>
          <p>step 1 description</p>
          <h3>Step 2</h3>
          <p>step 2 description</p>
          <h3>Step 3</h3>
          <p>step 3 description</p>
        </div>
      </div>
    </Layout>
  );
}
