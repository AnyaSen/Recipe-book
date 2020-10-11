import { AppEvents } from "../events";
import { IAction } from "../actions";
import { recipeArrType } from "../../types";

export interface IState {
  recipes: Array<recipeArrType>;
  isLoading: boolean;
  isError: boolean;
  currentRecipe: object;
}

const initState: IState = {
  recipes: [],
  currentRecipe: {},
  isLoading: true,
  isError: false
};

const rootReducer = (state: IState = initState, action: IAction) => {
  switch (action.type) {
    case AppEvents.SET_RECIPES:
      return { ...state, recipes: action.payload };

    case AppEvents.SET_LOADING:
      return { ...state, isLoading: true };

    case AppEvents.STOP_LOADING:
      return { ...state, isLoading: false };

    case AppEvents.SET_ERROR:
      return { ...state, isError: true };

    case AppEvents.SET_CUR_RECIPE:
      return { ...state, currentRecipe: action.payload };

    default:
      return { ...state };
  }
};

export default rootReducer;
