import React, { ReactElement, Dispatch, useEffect } from "react";
import { RouteComponentProps } from "react-router";
import axios from "axios";

import Styles from "./RecipePage.module.scss";

import { connect } from "react-redux";
import { IAppState } from "../../redux/store";
import {
  IAction,
  setLoading,
  setError,
  stopLoading,
  setCurrentRecipe
} from "../../redux/actions";

import Layout from "../../components/Layout";
import LoadingPage from "../../components/shared/LoadingPage";
import ErrorPage from "../../components/shared/ErrorPage";
import RecipeHeader from "../../components/RecipeHeader";
import RecipeInfo from "../../components/RecipeInfo";

interface MatchParams {
  id: string | undefined;
}

interface Props extends RouteComponentProps<MatchParams> {
  isLoading: boolean;
  isError: boolean;
  showError(): void;
  showLoading(): void;
  stopLoading(): void;
  setRecipe: (recipe: object) => void;
}

function RecipePage({
  match,
  isLoading,
  isError,
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
      .catch(e => {
        console.log("error:", e);
        showError();
        stopLoading();
      });
  }, [id, showError, showLoading, stopLoading]);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <Layout buttonText="Back to all" withLink linkTo="/" withButton>
      <div className={Styles.RecipePage}>
        <RecipeHeader id={id} />

        <RecipeInfo />
      </div>
    </Layout>
  );
}
const mapStateToProps = (state: IAppState) => {
  const { recipes, isLoading, isError } = state.app;
  return { recipes, isLoading, isError };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  showError: () => {
    dispatch(setError());
  },

  showLoading: () => {
    dispatch(setLoading());
  },

  stopLoading: () => {
    dispatch(stopLoading());
  },

  setRecipe: (recipe: object) => {
    dispatch(setCurrentRecipe(recipe));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
