import React from "react";
import axios from "axios";

import { connect } from "react-redux";

import RecipeForm from "../../components/RecipeForm/RecipeForm";
import {
  setStepsError,
  setIngredientsError,
  setSendingLoading,
  setSendingError
} from "../../redux/actions";
import { useHistory } from "react-router";

function FormPage({
  stepsArr,
  ingredientsArr,
  showStepsError,
  showIngredientsError,
  sendRecipe
}) {
  const history = useHistory();

  const onSubmit = values => {
    if (!ingredientsArr || ingredientsArr.length === 0) {
      showIngredientsError();
      return;
    } else if (!stepsArr || stepsArr.length === 0) {
      showStepsError();
      return;
    }

    const { name, time, portionsNumber } = values;

    const newRecipeObject = {
      name,
      time,
      portionsNumber,

      ingridients: ingredientsArr,

      steps: stepsArr
    };

    sendRecipe(newRecipeObject);
    history.push("/");
  };

  return <RecipeForm onSubmit={onSubmit} />;
}

const mapStateToProps = state => {
  const { isSendingLoading, isSendingError } = state.app;
  const { ingredientsArr, stepsArr } = state.formValues;
  return { isSendingLoading, isSendingError, ingredientsArr, stepsArr };
};

const mapDispatchToProps = dispatch => ({
  showStepsError: () => {
    dispatch(setStepsError("Add at least one step"));
  },

  hideStepsError: () => {
    dispatch(setStepsError(""));
  },

  showIngredientsError: () => {
    dispatch(setIngredientsError("Add at least one pair of ingredients"));
  },

  hideIngredientsError: () => {
    dispatch(setIngredientsError(""));
  },

  sendRecipe: newRecipeObject => {
    dispatch(setSendingLoading(true));

    axios
      .post("/recipe", newRecipeObject)

      .then(response => {
        dispatch(setSendingLoading(false));

        return response;
      })
      .catch(e => {
        dispatch(setSendingError(true));
        dispatch(setSendingLoading(false));

        console.log("error:", e);
      });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
