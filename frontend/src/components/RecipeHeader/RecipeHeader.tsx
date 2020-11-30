import React, { ReactElement } from "react";

import { recipeArrType } from "../../types";

import Styles from "./RecipeHeader.module.scss";

import { useSelector } from "react-redux";
import { IAppState } from "../../redux/store";

import StaticPicture from "../shared/StaticPicture";
import Label from "../shared/Label";
import IngredientPair from "../shared/IngredientPair";

interface Props {
  id: string | undefined;
}

function RecipeHeader({ id }: Props): ReactElement {
  const currentRecipe: recipeArrType = useSelector(
    (state: IAppState) => state.app.currentRecipe
  );

  const { name, ingridients, time, portionsNumber, img } = currentRecipe;

  return (
    <div className={Styles.RecipeHeader}>
      <div className={Styles.nameAndPicture}>
        <h1>{name} </h1>

        {img ? (
          <img src={`/recipes/${id}/img`} alt={name} />
        ) : (
          <StaticPicture horizontal text="No picture" />
        )}

        <div className="labels">
          <Label text={time} />
          <Label text={`${portionsNumber} portions`} />
        </div>
      </div>
      <div className={Styles.ingridients}>
        <h2>INGREDIENTS:</h2>
        <div className={Styles.ingridientPairs}>
          {ingridients &&
            ingridients.map((ingred, index) => {
              const { ingredient, quantity } = ingred;
              return (
                <IngredientPair
                  key={index}
                  quantity={ingredient}
                  ingredient={quantity}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default RecipeHeader;
