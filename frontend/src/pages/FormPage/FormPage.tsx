import React from "react";

import { connect } from "react-redux";
import { reduxForm, reset, InjectedFormProps } from "redux-form";

import RecipeForm from "../../components/RecipeForm";
import {
  setStepsErrorMessage,
  setIngredientsErrorMessage,
  postRecipe
} from "../../redux/actions";
import { useHistory } from "react-router";
import { IAppState } from "../../redux/store";
import { recipeArrType, ingredientsType, stepsType } from "../../types";
import { ThunkDispatch } from "redux-thunk";
import { compose, Dispatch } from "redux";

interface MapStatePropsType {
  ingredientsArr: Array<ingredientsType>;
  stepsArr: Array<stepsType>;

  showStepsError: () => void;
  showIngredientsError: () => void;
  postRecipe: (recipe: recipeArrType) => void;
  postRecipeWithImg: (recipe: recipeArrType, img: any) => void;
}

let FormPage: React.FC<InjectedFormProps<recipeArrType, recipeArrType> &
  MapStatePropsType> = ({
  postRecipe,
  postRecipeWithImg,

  stepsArr,
  ingredientsArr,
  showStepsError,
  showIngredientsError
}) => {
  const history = useHistory();

  const onSubmit = (values: recipeArrType, dispatch: Dispatch) => {
    if (!ingredientsArr || ingredientsArr.length === 0) {
      showIngredientsError();
      return;
    } else if (!stepsArr || stepsArr.length === 0) {
      showStepsError();
      return;
    }
    const { name, time, portionsNumber, img } = values;

    const newRecipeObject = {
      name,
      time,
      portionsNumber,

      ingridients: ingredientsArr,

      steps: stepsArr
    };

    if (!img) {
      postRecipe(newRecipeObject);
    } else {
      const picture = img[0];

      const fd = new FormData();

      fd.append("upload", picture, picture.name);

      postRecipeWithImg(newRecipeObject, fd);
    }

    dispatch(reset("create-recipe-form"));

    history.push("/");
  };

  return (
    <>
      {/* 
  // @ts-ignore */}
      <RecipeForm onSubmit={onSubmit} />
    </>
  );
};

const mapStateToProps = (state: IAppState) => {
  const { ingredientsArr, stepsArr } = state.formValues;
  return {
    ingredientsArr,
    stepsArr
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  showStepsError: () => {
    dispatch(setStepsErrorMessage("Add at least one step"));
  },

  showIngredientsError: () => {
    dispatch(
      setIngredientsErrorMessage("Add at least one pair of ingredients")
    );
  },

  postRecipe: (recipe: recipeArrType) => {
    dispatch(postRecipe(recipe));
  },

  postRecipeWithImg: (recipe: recipeArrType, img: any) => {
    dispatch(postRecipe(recipe, img));
  }
});

// FormPage = reduxForm({
//   form: "create-recipe-form"
// })(FormPage);

// export default connect(mapStateToProps, mapDispatchToProps)(FormPage);

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(reduxForm({ form: "create-recipe-form" })(FormPage));

// FormPage = connect(mapStateToProps, mapDispatchToProps)(FormPage);
// export default FormPage = reduxForm({
//   form: "create-recipe-form"
// })(FormPage);

export default compose(
  reduxForm({
    form: "create-recipe-form"
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(FormPage);
