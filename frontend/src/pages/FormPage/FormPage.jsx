import React, { useEffect } from "react";
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
    if (!ingredientsArr || ingredientsArr.length === 0) {
      showIngredientsError();
      return;
    } else if (!stepsArr || stepsArr.length === 0) {
      showStepsError();
      return;
    }

    const { name, time, portionsNumber, file } = values;

    const newRecipeObject = {
      name,
      time,
      portionsNumber,

      ingridients: ingredientsArr,

      steps: stepsArr
    };

    const fd = new FormData();

    const picture = file[0];

    fd.append("upload", picture, picture.name);

    sendRecipe(newRecipeObject, fd);

    dispatch(reset("create-recipe-form"));
    dispatch(setIngredientsArr([]));
    dispatch(setStepsArr([]));
    history.push("/");
  };

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

  sendRecipe: (newRecipeObject, recipePicture) => {
    dispatch(setSendingLoading());

    const config = {
      headers: { "content-type": "multipart/form-data" }
    };

    axios
      .post("/recipe", newRecipeObject)
      .then(response => {
        return axios.post(
          `/recipes/${response.data._id}/upload`,
          recipePicture,
          config
        );
      })

      .then(response => {
        dispatch(stopSendingLoading());
        dispatch(reset("create-recipe-form"));
        return response;
      })
      .catch(error => {
        dispatch(setSendingError());
        dispatch(stopSendingLoading());
        console.log("error:", error);
      });
  }
});

FormPage = reduxForm({
  form: "create-recipe-form"
})(FormPage);

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
