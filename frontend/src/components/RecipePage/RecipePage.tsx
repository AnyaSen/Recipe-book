import React, { ReactElement, Dispatch, useEffect } from "react";

import Styles from "./RecipePage.module.scss";
import { RouteComponentProps } from "react-router";
import Layout from "../Layout";
import { connect } from "react-redux";
import { IAppState } from "../../redux/store";
import {
  IAction,
  setLoading,
  setError,
  setCurrentRecipe
} from "../../redux/actions";
import axios from "axios";
import LoadingPage from "../shared/LoadingPage";
import ErrorPage from "../shared/ErrorPage";
import { recipeArrType } from "../../types";

interface MatchParams {
  id: string | undefined;
}

interface Props extends RouteComponentProps<MatchParams> {
  isLoading: boolean;
  isError: boolean;
  currentRecipe: recipeArrType;
  showError(): void;
  showLoading(): void;
  stopLoading(): void;
  setRecipe: (recipe: object) => void;
}

function RecipePage({
  match,
  isLoading,
  isError,
  currentRecipe,
  showError,
  showLoading,
  stopLoading,
  setRecipe
}: Props): ReactElement {
  const { id } = match.params;

  useEffect(() => {
    axios
      .get(`/recipes/${id}`)
      .then(response => {
        showLoading();
        const recipe = response.data;
        setRecipe(recipe);
        stopLoading();
      })
      .catch(() => {
        console.log("error");
        showError();
        stopLoading();
      });
  }, [id, showError, showLoading, stopLoading]);

  const { name, ingridients, time, portionsNumber, steps, img } = currentRecipe;

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <Layout buttonText="Back to all" withLink linkTo="/" withButton>
      <div className={Styles.RecipePage}>
        <div className={Styles.RecipeHeader}>
          <div>
            <h1>{name} </h1>
            <img src={img} alt={name} />
            <p>{time}</p>
            <p>{portionsNumber} portions</p>
          </div>
          <div>
            <h2>Ingredients</h2>
            {ingridients.map((ingredient, index) => {
              return (
                <p key={index}>
                  {ingredient.ingredient} - {ingredient.quantity}
                </p>
              );
            })}
          </div>
        </div>
        <div className={Styles.preparation}>
          <h2>Preparation</h2>
          {steps.map((step, index) => {
            return (
              <div key={index}>
                <h3>Step {index + 1}</h3>
                <p>{step}</p>{" "}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
const mapStateToProps = (state: IAppState) => {
  const { recipes, isLoading, isError, currentRecipe } = state.app;
  return { recipes, isLoading, isError, currentRecipe };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  showError: () => {
    dispatch(setError(true));
  },

  showLoading: () => {
    dispatch(setLoading(true));
  },

  stopLoading: () => {
    dispatch(setLoading(false));
  },

  setRecipe: (recipe: object) => {
    dispatch(setCurrentRecipe(recipe));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
