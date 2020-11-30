import React, { ReactElement } from "react";

import { recipeArrType } from "../../types";

import Styles from "./RecipeInfo.module.scss";

import { useSelector } from "react-redux";
import { IAppState } from "../../redux/store";
import RecipeStep from "../shared/RecipeStep";

function RecipeInfo(): ReactElement {
  const currentRecipe: recipeArrType = useSelector(
    (state: IAppState) => state.app.currentRecipe
  );

  const { steps } = currentRecipe;

  return (
    <div className={Styles.RecipeInfo}>
      <h2>PREPARATION:</h2>
      <div className={Styles.preparation}>
        {steps &&
          steps.map((step, index) => {
            return (
              <RecipeStep key={index} text={step.step} number={index + 1} />
            );
          })}
      </div>
    </div>
  );
}

export default RecipeInfo;
