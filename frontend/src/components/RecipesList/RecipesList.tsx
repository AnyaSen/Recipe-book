import React, { ReactElement, useEffect, Dispatch } from "react";
import axios from "axios";
import { connect } from "react-redux";

import Styles from "./RecipesList.module.scss";

import Recipe from "./Recipe/Recipe";
import Layout from "../Layout";
import { IAppState } from "../../redux/store";
import { IAction, setRecipes } from "../../redux/actions";

interface Props {
  getAndSetRecipes(): void;
  recipes: Array<{
    name: string;
    ingridients: Array<{
      ingredient: string;
      quantity: string;
    }>;
    time: string;
    portionsNumber: number;
    steps: Array<string>;
    img: string;
  }>;
}

function RecipesList({ getAndSetRecipes, recipes }: Props): ReactElement {
  console.log(recipes);

  useEffect(() => {
    getAndSetRecipes();
  }, []);

  return (
    <Layout buttonText="Create recipe">
      <div className={Styles.RecipesList}>
        {recipes.map((recipe, index) => {
          const { img, time, name } = recipe;
          return (
            <Recipe
              key={index}
              name={name}
              time={time}
              imgSrc={img}
              id={index}
            />
          );
        })}
      </div>
    </Layout>
  );
}

const mapStateToProps = (state: IAppState) => {
  return { recipes: state.app.recipes };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  getAndSetRecipes: () => {
    axios
      .get("/recipes")
      .then(response => {
        const recipes = response.data;
        dispatch(setRecipes(recipes));
      })
      .catch(() => {
        console.log("error");
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);
