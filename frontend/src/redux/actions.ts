import { AppEvents } from "./events";
import { recipeArrType, ingredientsType, stepsType } from "../types";

export interface IAction {
  type: AppEvents;
  payload: any;
}
const {
  SET_RECIPES,
  SET_CUR_RECIPE,
  SET_LOADING,
  SET_ERROR,
  SET_INGR_ARR,
  SET_INGR_ERR,
  SHOW_INGR_FIELDS,
  SET_STEPS_ARR,
  SET_STEPS_ERR,
  SHOW_STEPS_FIELDS
} = AppEvents;

export const setRecipes = (payload: Array<recipeArrType>) => {
  return {
    type: SET_RECIPES,
    payload
  };
};

export const setCurrentRecipe = (payload: object) => {
  return {
    type: SET_CUR_RECIPE,
    payload
  };
};

export const setLoading = (payload: boolean) => {
  return {
    type: SET_LOADING,
    payload
  };
};

export const setError = (payload: boolean) => {
  return {
    type: SET_ERROR,
    payload
  };
};

export const setIngredientsArr = (payload: Array<ingredientsType>) => {
  return {
    type: SET_INGR_ARR,
    payload
  };
};

export const setIngredientsError = (payload: boolean) => {
  return {
    type: SET_INGR_ERR,
    payload
  };
};

export const showIngredientFields = (payload: boolean) => {
  return {
    type: SHOW_INGR_FIELDS,
    payload
  };
};

export const setStepsArr = (payload: Array<stepsType>) => {
  return {
    type: SET_STEPS_ARR,
    payload
  };
};

export const setStepsError = (payload: boolean) => {
  return {
    type: SET_STEPS_ERR,
    payload
  };
};

export const showStepFields = (payload: boolean) => {
  return {
    type: SHOW_STEPS_FIELDS,
    payload
  };
};
