import React from "react";

import { connect } from "react-redux";

import RecipeForm from "../../components/RecipeForm/RecipeForm";
import { setStepsError, setIngredientsError } from "../../redux/actions";

function FormPage({
  stepsArr,
  ingredientsArr,
  showStepsError,
  showIngredientsError
}) {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async values => {
    if (!ingredientsArr || ingredientsArr.length === 0) {
      showIngredientsError();
      return;
    } else if (!stepsArr || stepsArr.length === 0) {
      showStepsError();
      return;
    }
    await sleep(2000);

    console.log(values, ingredientsArr, stepsArr);
  };

  return <RecipeForm onSubmit={onSubmit} />;
}

const mapStateToProps = state => {
  const { ingredientsArr, stepsArr } = state.formValues;
  return { ingredientsArr, stepsArr };
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(FormPage);
