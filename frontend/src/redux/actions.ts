import { AppEvents } from "./events";
import { recipeArrType } from "../types";

export interface IAction {
  type: AppEvents;
  payload: any;
}
const { SET_RECIPES, SET_CUR_RECIPE, SET_LOADING, SET_ERROR } = AppEvents;

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
