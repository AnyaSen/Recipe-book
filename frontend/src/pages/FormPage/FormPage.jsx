import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";

import RecipeForm from "../../components/RecipeForm/RecipeForm";
import {
  setStepsErrorMessage,
  setIngredientsErrorMessage,
  setIngredientsArr,
  setStepsArr,
  postRecipe
} from "../../redux/actions";
import { useHistory } from "react-router";
import LoadingPage from "../../components/shared/LoadingPage";
import ErrorPage from "../../components/shared/ErrorPage";

let FormPage = ({
  isSendingLoading,
  isSendingError,
  postRecipe,
  postRecipeWithImg,

  stepsArr,
  ingredientsArr,
  showStepsError,
  showIngredientsError
}) => {
  const history = useHistory();

  const onSubmit = (values, dispatch) => {
    const { name, time, portionsNumber, file } = values;

    if (!ingredientsArr || ingredientsArr.length === 0) {
      showIngredientsError();
    } else if (!stepsArr || stepsArr.length === 0) {
      showStepsError();
    }

    const newRecipeObject = {
      name,
      time,
      portionsNumber,

      ingridients: ingredientsArr,

      steps: stepsArr
    };

    {
      if (!file) {
        postRecipe(newRecipeObject);
      } else {
        const picture = file[0];

        const fd = new FormData();

        fd.append("upload", picture, picture.name);

        postRecipeWithImg(newRecipeObject, fd);
      }
    }

    dispatch(reset("create-recipe-form"));
    dispatch(setIngredientsArr([]));
    dispatch(setStepsArr([]));
    history.push("/");
  };

  if (isSendingLoading) return <LoadingPage />;
  if (isSendingError) return <ErrorPage />;

  return <RecipeForm onSubmit={onSubmit} />;
};

const mapStateToProps = state => {
  const { isSendingLoading, isSendingError } = state.app;
  const { ingredientsArr, stepsArr, currentRecipeID } = state.formValues;
  return {
    isSendingLoading,
    isSendingError,
    ingredientsArr,
    stepsArr,
    currentRecipeID
  };
};

const mapDispatchToProps = dispatch => ({
  showStepsError: () => {
    dispatch(setStepsErrorMessage("Add at least one step"));
  },

  hideStepsError: () => {
    dispatch(setStepsErrorMessage(""));
  },

  showIngredientsError: () => {
    dispatch(
      setIngredientsErrorMessage("Add at least one pair of ingredients")
    );
  },

  hideIngredientsError: () => {
    dispatch(setIngredientsErrorMessage(""));
  },

  postRecipe: recipe => {
    dispatch(postRecipe(recipe));
  },

  postRecipeWithImg: (recipe, img) => {
    dispatch(postRecipe(recipe, img));
  }
});

FormPage = reduxForm({
  form: "create-recipe-form"
})(FormPage);

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
