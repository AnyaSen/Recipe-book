import React from "react";
import axios from "axios";

import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";

import RecipeForm from "../../components/RecipeForm/RecipeForm";
import {
  setStepsErrorMessage,
  setIngredientsErrorMessage,
  setSendingLoading,
  setSendingError,
  setIngredientsArr,
  setStepsArr,
  stopSendingLoading
} from "../../redux/actions";
import { useHistory } from "react-router";

let FormPage = ({
  stepsArr,
  ingredientsArr,
  showStepsError,
  showIngredientsError,
  sendRecipe
}) => {
  const history = useHistory();

  const onSubmit = (values, dispatch) => {
    console.log(values);
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

    dispatch(reset("create-recipe-form"));
    dispatch(setIngredientsArr([]));
    dispatch(setStepsArr([]));
    history.push("/");
  };

  return <RecipeForm onSubmit={onSubmit} />;
};

const mapStateToProps = state => {
  const { recipes, isSendingLoading, isSendingError } = state.app;
  const { ingredientsArr, stepsArr } = state.formValues;
  return { isSendingLoading, isSendingError, ingredientsArr, stepsArr };
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

  sendRecipe: newRecipeObject => {
    dispatch(setSendingLoading());

    axios
      .post("/recipe", newRecipeObject)

      .then(response => {
        dispatch(stopSendingLoading());
        dispatch(reset("create-recipe-form"));

        return response;
      })
      .catch(e => {
        dispatch(setSendingError());
        dispatch(stopSendingLoading());

        console.log("error:", e);
      });
  }
});

FormPage = reduxForm({
  form: "create-recipe-form"
})(FormPage);

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
