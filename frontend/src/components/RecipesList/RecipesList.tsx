import React, { ReactElement } from "react";

import { useSelector } from "react-redux";
import { IAppState } from "../../redux/store";
import { recipeArrType } from "../../types";

import Styles from "./RecipesList.module.scss";

import Recipe from "./Recipe/Recipe";
import Button from "../shared/Buttons/Button";

function RecipesList(): ReactElement {
  const recipes: Array<recipeArrType> = useSelector(
    (state: IAppState) => state.app.recipes
  );

  if (recipes.length === 0)
    return (
      <div className={Styles.noRecipes}>
        <h3>There are no recipes yet.</h3>
        <Button text="Click to create" withLink linkTo="/create" />
      </div>
    );

  return (
    <div className={Styles.RecipesList} data-cy="recipe-list">
      {recipes.map(recipe => {
        const { img, time, name, _id } = recipe;

        return (
          <Recipe
            key={_id}
            name={name}
            time={time}
            imgSrc={img && `/recipes/${_id}/img`}
            id={_id}
            dataCy={name}
          />
        );
      })}
    </div>
  );
}

export default RecipesList;
