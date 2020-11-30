import React from "react";

import RecipeForm from "../../components/RecipeForm";

import { connect } from "react-redux";
import { reduxForm, reset, InjectedFormProps } from "redux-form";
import {
  setStepsErrorMessage,
  setIngredientsErrorMessage,
  postRecipe
} from "../../redux/actions";
import { useHistory } from "react-router";
import { IAppState } from "../../redux/store";
import { recipeFormDataType, ingredientsType, stepsType } from "../../types";
import { ThunkDispatch } from "redux-thunk";
import { compose, Dispatch } from "redux";

import { FORM_NAME } from "../../constant";

interface MapStatePropsType {
  ingredientsArr: Array<ingredientsType>;
  stepsArr: Array<stepsType>;

  showStepsError: () => void;
  showIngredientsError: () => void;
  postRecipe: (recipe: recipeFormDataType) => void;
  postRecipeWithImg: (recipe: recipeFormDataType, img: any) => void;
}

let FormPage: React.FC<InjectedFormProps<
  recipeFormDataType,
  recipeFormDataType
> &
  MapStatePropsType> = ({
  postRecipe,
  postRecipeWithImg,

  stepsArr,
  ingredientsArr,
  showStepsError,
  showIngredientsError
}) => {
  const history = useHistory();

  const onSubmit = (values: recipeFormDataType, dispatch: Dispatch) => {
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

    const sendRecipe = async () => {
      try {
        if (!file) {
          await postRecipe(newRecipeObject);
          dispatch(reset(FORM_NAME));
          history.push("/success");
        } else {
          const picture = file[0];

          const fd = new FormData();

          fd.append("upload", picture, picture.name);

          await postRecipeWithImg(newRecipeObject, fd);
          dispatch(reset(FORM_NAME));
          history.push("/success");
        }
      } catch (e) {
        console.log(e);
      }
    };
    sendRecipe();
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

  postRecipe: (recipe: recipeFormDataType) => {
    dispatch(postRecipe(recipe));
  },

  postRecipeWithImg: (recipe: recipeFormDataType, img: any) => {
    dispatch(postRecipe(recipe, img));
  }
});

export default compose(
  reduxForm({
    form: FORM_NAME
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(FormPage);
