import React, { ReactElement, useEffect } from "react";
import { ThunkDispatch } from "redux-thunk";

import { connect } from "react-redux";
import { IAppState } from "../../redux/store";
import { fetchRecipes } from "../../redux/actions";

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
    <Layout buttonText="Create recipe" withButton withLink linkTo="/create">
      <RecipesList />
    </Layout>
  );
}

const mapStateToProps = (state: IAppState) => {
  const { isLoading, isError } = state.app;
  return { isLoading, isError };
};
const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getAndSetRecipes: () => {
    dispatch(fetchRecipes());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
