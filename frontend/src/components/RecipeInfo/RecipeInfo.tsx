import React, { ReactElement } from "react";

import { recipeArrType } from "../../types";

import Styles from "./RecipeInfo.module.scss";

import { connect } from "react-redux";
import { IAppState } from "../../redux/store";

interface Props {
  currentRecipe: recipeArrType;
}

function RecipeInfo({ currentRecipe }: Props): ReactElement {
  const { steps } = currentRecipe;

  return (
    <div className={Styles.RecipeInfo}>
      <div className={Styles.preparation}>
        <h2>Preparation</h2>
        {steps &&
          steps.map((step, index) => {
            return (
              <div key={index}>
                <h3>Step {index + 1}</h3>
                <p>{step}</p>{" "}
              </div>
            );
          })}
      </div>
    </div>
  );
}
const mapStateToProps = (state: IAppState) => {
  const { currentRecipe } = state.app;
  return { currentRecipe };
};

export default connect(mapStateToProps)(RecipeInfo);
