import React, { ReactElement, useEffect } from "react";
import { RouteComponentProps } from "react-router";

import Styles from "./RecipePage.module.scss";

import { connect } from "react-redux";
import { IAppState } from "../../redux/store";
import { fetchRecipe } from "../../redux/actions";

import Layout from "../../components/Layout";
import LoadingPage from "../../components/shared/LoadingPage";
import ErrorPage from "../../components/shared/ErrorPage";
import RecipeHeader from "../../components/RecipeHeader";
import RecipeInfo from "../../components/RecipeInfo";
import { ThunkDispatch } from "redux-thunk";

interface MatchParams {
  id: string | undefined;
}

interface Props extends RouteComponentProps<MatchParams> {
  isRecipeLoading: boolean;
  isRecipeError: boolean;
  getAndSetRecipe: (url: string) => void;
}

function RecipePage({
  match,
  isRecipeLoading,
  isRecipeError,
  getAndSetRecipe
}: Props): ReactElement {
  const { id } = match.params;

  useEffect(() => {
    getAndSetRecipe(`/recipes/${id}`);
  }, []);

  if (isRecipeLoading) return <LoadingPage />;
  if (isRecipeError) return <ErrorPage />;

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
  const { recipes, isRecipeLoading, isRecipeError } = state.app;
  return { recipes, isRecipeLoading, isRecipeError };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getAndSetRecipe: (url: string) => {
    dispatch(fetchRecipe(url));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(RecipePage);
