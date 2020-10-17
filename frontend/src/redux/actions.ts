import axios from "axios";
import { Dispatch } from "redux";
import { AppEvents } from "./events";
import { recipeArrType, ingredientsType, stepsType } from "../types";

export interface IAction {
  type: AppEvents;
  payload?: any;
}
const {
  SET_ERROR,
  SET_INGR_ARR,
  SET_INGR_ERR,
  SHOW_INGR_FIELDS,
  CLOSE_INGR_FIELDS,
  TOGGLE_INGR_FIELDS,
  SET_STEPS_ARR,
  SET_STEPS_ERR,
  SHOW_STEPS_FIELDS,
  CLOSE_STEPS_FIELDS,
  TOGGLE_STEPS_FIELDS,
  SET_SEND_LOADING,
  STOP_SEND_LOADING,
  SET_SEND_ERR,
  FETCH_RECIPES_LOADING,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_ERROR,
  FETCH_RECIPE_LOADING,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_ERROR
} = AppEvents;

export const setError = () => {
  return {
    type: SET_ERROR
  };
};

export const setIngredientsArr = (payload: Array<ingredientsType>) => {
  return {
    type: SET_INGR_ARR,
    payload
  };
};

export const setIngredientsErrorMessage = (payload: string) => {
  return {
    type: SET_INGR_ERR,
    payload
  };
};

export const showIngredientFields = () => {
  return {
    type: SHOW_INGR_FIELDS
  };
};

export const closeIngredientFields = () => {
  return {
    type: CLOSE_INGR_FIELDS
  };
};

export const toggleIngredientFields = () => {
  return {
    type: TOGGLE_INGR_FIELDS
  };
};

export const setStepsArr = (payload: Array<stepsType>) => {
  return {
    type: SET_STEPS_ARR,
    payload
  };
};

export const setStepsErrorMessage = (payload: string) => {
  return {
    type: SET_STEPS_ERR,
    payload
  };
};

export const showStepFields = () => {
  return {
    type: SHOW_STEPS_FIELDS
  };
};

export const closeStepFields = () => {
  return {
    type: CLOSE_STEPS_FIELDS
  };
};

export const toggleStepFields = () => {
  return {
    type: TOGGLE_STEPS_FIELDS
  };
};

export const setSendingLoading = () => {
  return {
    type: SET_SEND_LOADING
  };
};

export const stopSendingLoading = () => {
  return {
    type: STOP_SEND_LOADING
  };
};

export const setSendingError = () => {
  return {
    type: SET_SEND_ERR
  };
};

export const fetchRecipesLoading = () => {
  return {
    type: FETCH_RECIPES_LOADING
  };
};

export const fetchRecipesSuccess = (payload: Array<recipeArrType>) => {
  return {
    type: FETCH_RECIPES_SUCCESS,
    payload
  };
};

export const fetchRecipesError = (payload: any) => {
  return {
    type: FETCH_RECIPES_ERROR,
    payload
  };
};

export const fetchRecipeLoading = () => {
  return {
    type: FETCH_RECIPE_LOADING
  };
};

export const fetchRecipeSuccess = (payload: recipeArrType) => {
  return {
    type: FETCH_RECIPE_SUCCESS,
    payload
  };
};

export const fetchRecipeError = (payload: any) => {
  return {
    type: FETCH_RECIPE_ERROR,
    payload
  };
};

export const fetchRecipes = () => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch(fetchRecipesLoading());

    axios
      .get("/recipes")
      .then(response => {
        const recipes = response.data;
        dispatch(fetchRecipesSuccess(recipes));
      })
      .catch(e => {
        console.log("error:", e);
        dispatch(fetchRecipesError(e));
      });
  };
};

export const fetchRecipe = (url: string) => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch(fetchRecipeLoading());

    axios
      .get(url)
      .then(response => {
        const recipe = response.data;
        dispatch(fetchRecipeSuccess(recipe));
      })
      .catch(e => {
        console.log("error:", e);
        dispatch(fetchRecipeError(e));
      });
  };
};
