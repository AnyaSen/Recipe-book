import React, { ReactElement } from "react";

import { connect } from "react-redux";
import { IAppState } from "../../redux/store";
import { recipeArrType } from "../../types";

import Styles from "./RecipesList.module.scss";

import Recipe from "./Recipe/Recipe";

interface Props {
  recipes: Array<recipeArrType>;
}

function RecipesList({ recipes }: Props): ReactElement {
  return (
    <div className={Styles.RecipesList}>
      {recipes.map((recipe, index) => {
        const { img, time, name, _id } = recipe;

        return (
          <Recipe
            key={_id}
            name={name}
            time={time}
            imgSrc={!img ? undefined : `/recipes/${_id}/img`}
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
