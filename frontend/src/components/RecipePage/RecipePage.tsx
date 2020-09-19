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

interface MatchParams {
  id: string | undefined;
}

interface Props extends RouteComponentProps<MatchParams> {
  isLoading: boolean;
  isError: boolean;
  currentRecipe: object;
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

  console.log(currentRecipe);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <Layout buttonText="Back to all" withLink linkTo="/" withButton>
      <div className={Styles.RecipePage}>
        <div className={Styles.RecipeHeader}>
          <div>
            <h1>name {id}</h1>
            <img src="" alt="some alt" />
            <p>20min</p>
            <p>8 portions</p>
          </div>
          <div>
            <h2>Ingredients</h2>
            <p>2 eggs</p>
            <p>250ml milk</p>
            <p>20gr butter</p>
          </div>
        </div>
        <div className={Styles.preparation}>
          <h2>Preparation</h2>
          <h3>Step 1</h3>
          <p>step 1 description</p>
          <h3>Step 2</h3>
          <p>step 2 description</p>
          <h3>Step 3</h3>
          <p>step 3 description</p>
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
