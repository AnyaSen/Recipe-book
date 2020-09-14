import { AppEvents } from "./events";

export interface IAction {
  type: AppEvents;
  payload: any;
}

export const setRecipes = (
  payload: Array<{
    name: string;
    ingridients: Array<{
      ingredient: string;
      quantity: string;
    }>;
    time: string;
    portionsNumber: number;
    steps: Array<string>;
    img: string;
  }>
) => {
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
