import React from "react";

import { connect } from "react-redux";
import { reduxForm, reset } from "redux-form";

import RecipeForm from "../../components/RecipeForm";
import {
  setStepsErrorMessage,
  setIngredientsErrorMessage,
  postRecipe
} from "../../redux/actions";
import { useHistory } from "react-router";

let FormPage = ({
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
      return;
    } else if (!stepsArr || stepsArr.length === 0) {
      showStepsError();
      return;
    }

    const newRecipeObject = {
      name,
      time,
      portionsNumber,

      ingridients: ingredientsArr,

      steps: stepsArr
    };

    if (!file) {
      postRecipe(newRecipeObject);
    } else {
      const picture = file[0];

      const fd = new FormData();

      fd.append("upload", picture, picture.name);

      postRecipeWithImg(newRecipeObject, fd);
    }

    dispatch(reset("create-recipe-form"));

    history.push("/");
  };

  return <RecipeForm onSubmit={onSubmit} />;
};

const mapStateToProps = state => {
  const { ingredientsArr, stepsArr } = state.formValues;
  return {
    ingredientsArr,
    stepsArr
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
