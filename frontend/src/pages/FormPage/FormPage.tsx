import React, { useCallback } from "react";

import RecipeForm from "../../components/RecipeForm";

import { connect, useSelector, useDispatch } from "react-redux";
import { reduxForm, reset, InjectedFormProps } from "redux-form";
import {
  setStepsErrorMessage,
  setIngredientsErrorMessage,
  postRecipe
} from "../../redux/actions";
import { useHistory } from "react-router";
import { IAppState } from "../../redux/store";
import { recipeAllFormDataType, ingredientsType, stepsType } from "../../types";
import { ThunkDispatch } from "redux-thunk";

import { FORM_NAME } from "../../constants";

let FormPage: React.FC<InjectedFormProps<
  recipeAllFormDataType,
  recipeAllFormDataType
>> = () => {
  const ingredientsArr: Array<ingredientsType> = useSelector(
    (state: IAppState) => state.formValues.ingredientsArr
  );
  const stepsArr: Array<stepsType> = useSelector(
    (state: IAppState) => state.formValues.stepsArr
  );

  const dispatch: ThunkDispatch<{}, {}, any> = useDispatch();

  const postRecipeWithoutImg: (
    recipe: recipeAllFormDataType
  ) => void = useCallback(
    (recipe: recipeAllFormDataType) => dispatch(postRecipe(recipe)),
    [dispatch]
  );
  const postRecipeWithImg: (
    recipe: recipeAllFormDataType,
    img: any
  ) => void = useCallback(
    (recipe: recipeAllFormDataType, img: any) =>
      dispatch(postRecipe(recipe, img)),
    [dispatch]
  );

  const history = useHistory();

  const handleSubmit = (values: any) => {
    console.log(values);
    if (!ingredientsArr || ingredientsArr.length === 0) {
      dispatch(
        setIngredientsErrorMessage("Add at least one pair of ingredients")
      );
      return;
    } else if (!stepsArr || stepsArr.length === 0) {
      dispatch(setStepsErrorMessage("Add at least one step"));

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
          await postRecipeWithoutImg(newRecipeObject);
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

  return <RecipeForm onSubmit={handleSubmit} />;
};

export default FormPage = connect(reduxForm({ form: FORM_NAME }))(FormPage);
