import React, { ReactElement, useEffect, Dispatch } from "react";
import axios from "axios";

import { connect } from "react-redux";
import { IAppState } from "../../redux/store";
import { IAction, setRecipes, setLoading, setError } from "../../redux/actions";

import Layout from "../../components/Layout";
import RecipesList from "../../components/RecipesList";
import LoadingPage from "../../components/shared/LoadingPage";
import ErrorPage from "../../components/shared/ErrorPage";

interface Props {
  getAndSetRecipes(): void;
  isLoading: boolean;
  isError: boolean;
}

function HomePage({
  isLoading,
  isError,
  getAndSetRecipes
}: Props): ReactElement {
  useEffect(() => {
    getAndSetRecipes();
  }, []);

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

  return (
    <Layout buttonText="Create recipe" withButton>
      <RecipesList />
    </Layout>
  );
}

const mapStateToProps = (state: IAppState) => {
  const { isLoading, isError } = state.app;
  return { isLoading, isError };
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
      .catch(e => {
        console.log("error:", e);
        dispatch(setError(true));
        dispatch(setLoading(false));
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
