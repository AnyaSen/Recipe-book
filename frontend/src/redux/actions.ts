import { AppEvents } from "./events";
import { recipeArrType } from "../types";

export interface IAction {
  type: AppEvents;
  payload: any;
}

export const setRecipes = (payload: Array<recipeArrType>) => {
  return {
    type: AppEvents.SET_RECIPES,
    payload
  };
};

export const setLoading = (payload: boolean) => {
  return {
    type: AppEvents.SET_LOADING,
    payload
  };
};

export const setError = (payload: boolean) => {
  return {
    type: AppEvents.SET_ERROR,
    payload
  };
};
