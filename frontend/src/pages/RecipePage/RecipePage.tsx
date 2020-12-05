import React, { ReactElement, useEffect, useCallback } from "react";
import { RouteComponentProps } from "react-router";

import { useSelector, useDispatch } from "react-redux";
import { IAppState } from "../../redux/store";
import { fetchRecipe } from "../../redux/actions";
import { ThunkDispatch } from "redux-thunk";

import Layout from "../../components/Layout";
import LoadingPage from "../../components/shared/LoadingPage";
import ErrorPage from "../../components/shared/ErrorPage";
import RecipeHeader from "../../components/RecipeHeader";
import RecipeInfo from "../../components/RecipeInfo";

interface MatchParams {
  id: string | undefined;
}

interface Props extends RouteComponentProps<MatchParams> {
  isRecipeLoading: boolean;
  isRecipeError: boolean;
  getAndSetRecipe: (url: string) => void;
}

function RecipePage({ match }: Props): ReactElement {
  const { id } = match.params;

  const isRecipeLoading = useSelector(
    (state: IAppState) => state.app.isRecipeLoading
  );
  const isRecipeError = useSelector(
    (state: IAppState) => state.app.isRecipeError
  );

  const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();
  const getAndSetRecipe = useCallback(
    (url: string) => dispatch(fetchRecipe(url)),
    [dispatch]
  );

  useEffect(() => {
    getAndSetRecipe(`/recipes/${id}`);
  }, [id]);

  if (isRecipeLoading) return <LoadingPage />;
  if (isRecipeError) return <ErrorPage />;

  return (
    <Layout buttonText="Back to all" withLink linkTo="/" withButton>
      <div data-cy="recipe-info">
        <RecipeHeader id={id} />

        <RecipeInfo />
      </div>
    </Layout>
  );
}

export default RecipePage;
