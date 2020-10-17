import React, { ReactElement, useEffect } from "react";

import { connect } from "react-redux";
import { IAppState } from "../../redux/store";
import { recipeArrType } from "../../types";

import Styles from "./RecipesList.module.scss";

import Recipe from "./Recipe/Recipe";
import Button from "../shared/Buttons/Button";

interface Props {
  recipes: Array<recipeArrType>;
}

function RecipesList({ recipes }: Props): ReactElement {
  useEffect(() => {
    const lastRecipe = recipes[recipes.length - 1];
    console.log(lastRecipe.img);
  }, []);

  if (recipes.length === 0)
    return (
      <div className={Styles.noRecipes}>
        <h3>There are no recipes yet.</h3>
        <Button text="Click to create" withLink linkTo="/create" />
      </div>
    );

  return (
    <div className={Styles.RecipesList}>
      {recipes.map(recipe => {
        const { img, time, name, _id } = recipe;

        return (
          <Recipe
            key={_id}
            name={name}
            time={time}
            imgSrc={img && `/recipes/${_id}/img`}
            id={_id}
          />
        );
      })}
    </div>
  );
}

const mapStateToProps = (state: IAppState) => {
  const { recipes } = state.app;
  return { recipes };
};

export default connect(mapStateToProps)(RecipesList);
