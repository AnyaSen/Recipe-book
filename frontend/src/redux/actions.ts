import { AppEvents } from "./events";

export interface IAction {
  type: AppEvents;
  payload: any;
}

export const setRecipes = (payload: Array<any>) => {
  return {
    type: AppEvents.SET_RECIPES,
    payload
  };
};
