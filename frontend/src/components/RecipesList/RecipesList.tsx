import React, { ReactElement, useEffect, Dispatch } from "react";
import axios from "axios";

import { connect } from "react-redux";
import { IAppState } from "../../redux/store";
import { IAction, setRecipes, setLoading, setError } from "../../redux/actions";

import Styles from "./RecipesList.module.scss";

import Recipe from "./Recipe/Recipe";
import Layout from "../Layout";
import LoadingPage from "../shared/LoadingPage";
import ErrorPage from "../shared/ErrorPage";

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

  isLoading: boolean;
  isError: boolean;
}

function RecipesList({
  getAndSetRecipes,
  recipes,
  isLoading,
  isError
}: Props): ReactElement {
  useEffect(() => {
    getAndSetRecipes();
  }, []);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <Layout buttonText="Create recipe" withButton>
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
  const { recipes, isLoading, isError } = state.app;
  return { recipes, isLoading, isError };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  getAndSetRecipes: () => {
    axios
      .get("/recipes")
      .then(response => {
        const recipes = response.data;
        dispatch(setRecipes(recipes));
        dispatch(setLoading(false));
      })
      .catch(() => {
        console.log("error");
        dispatch(setError(true));
        dispatch(setLoading(false));
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipesList);
