import { AppEvents } from "../events";
import { IAction } from "../actions";
import { recipeArrType } from "../../types";

export interface IState {
  recipes: Array<recipeArrType>;
  isLoading: boolean;
  isError: boolean;

  isRecipeLoading: boolean;
  isRecipeError: boolean;
  currentRecipe: object;

  isSendingLoading: boolean;
  isSendingError: boolean;
}

const initState: IState = {
  recipes: [],
  isLoading: true,
  isError: false,

  currentRecipe: {},
  isRecipeLoading: false,
  isRecipeError: false,

  isSendingLoading: false,
  isSendingError: false
};

const rootReducer = (state: IState = initState, action: IAction) => {
  switch (action.type) {
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
        isError: true
      };

    case AppEvents.FETCH_RECIPE_LOADING:
      return {
        ...state,
        isRecipeLoading: true
      };

    case AppEvents.FETCH_RECIPE_SUCCESS:
      return {
        ...state,
        isRecipeLoading: false,
        currentRecipe: action.payload
      };

    case AppEvents.FETCH_RECIPE_ERROR:
      return {
        ...state,
        isRecipeLoading: false,
        isRecipeError: true
      };

    case AppEvents.POST_RECIPE_LOADING:
      return {
        ...state,
        isSendingLoading: true
      };

    case AppEvents.POST_RECIPE_SUCCESS:
      return {
        ...state,
        isSendingLoading: false
      };

    case AppEvents.POST_RECIPE_ERROR:
      return {
        ...state,
        isSendingLoading: false,
        isSendingError: true
      };

    default:
      return { ...state };
  }
};

export default rootReducer;
