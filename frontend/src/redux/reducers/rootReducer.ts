import { AppEvents } from "../events";
import { IAction } from "../actions";
import { recipeArrType } from "../../types";

export interface IState {
  recipes: Array<recipeArrType>;
  isLoading: boolean;
  isError: boolean;
  currentRecipe: object;
  loading: boolean;
  error: null;
}

const initState: IState = {
  recipes: [],
  currentRecipe: {},
  isLoading: true,
  isError: false,
  loading: false,
  error: null
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

    case AppEvents.FETCH_RECIPES_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case AppEvents.FETCH_RECIPES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        recipes: action.payload
      };

    case AppEvents.FETCH_RECIPES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        isError: true
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
