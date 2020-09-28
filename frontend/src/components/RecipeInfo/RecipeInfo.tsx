import React, { ReactElement } from "react";

import { recipeArrType } from "../../types";

import Styles from "./RecipeInfo.module.scss";

import { connect } from "react-redux";
import { IAppState } from "../../redux/store";
import RecipeStep from "../shared/RecipeStep";

interface Props {
  currentRecipe: recipeArrType;
}

function RecipeInfo({ currentRecipe }: Props): ReactElement {
  const { steps } = currentRecipe;

  return (
    <div className={Styles.RecipeInfo}>
      <h2>PREPARATION:</h2>
      <div className={Styles.preparation}>
        {steps &&
          steps.map((step, index) => {
            return <RecipeStep key={index} text={step} number={index + 1} />;
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
