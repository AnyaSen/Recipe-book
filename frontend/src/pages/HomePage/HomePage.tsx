import React, { ReactElement, useEffect, useCallback } from "react";

import { ThunkDispatch } from "redux-thunk";
import { IAppState } from "../../redux/store";
import { fetchRecipes } from "../../redux/actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import Layout from "../../components/Layout";
import RecipesList from "../../components/RecipesList";
import LoadingPage from "../../components/shared/LoadingPage";
import ErrorPage from "../../components/shared/ErrorPage";

function HomePage(): ReactElement {
  const isLoading = useSelector((state: IAppState) => state.app.isLoading);
  const isError = useSelector((state: IAppState) => state.app.isError);
  const isSendingLoading = useSelector(
    (state: IAppState) => state.formValues.isSendingLoading
  );
  const isSendingError = useSelector(
    (state: IAppState) => state.formValues.isSendingError
  );

  const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();
  const getAndSetRecipes = useCallback(() => dispatch(fetchRecipes()), [
    dispatch
  ]);

  useEffect(() => {
    getAndSetRecipes();
  }, []);

  if (isLoading || isSendingLoading) return <LoadingPage />;
  if (isError || isSendingError) return <ErrorPage />;

  return (
    <Layout buttonText="Create recipe" withButton withLink linkTo="/create">
      <RecipesList />
    </Layout>
  );
}

export default HomePage;
