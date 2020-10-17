import axios from "axios";
import { Dispatch } from "redux";
import { AppEvents } from "./events";
import { recipeArrType, ingredientsType, stepsType } from "../types";

export interface IAction {
  type: AppEvents;
  payload?: any;
}
const {
  FETCH_RECIPES_LOADING,
  FETCH_RECIPES_SUCCESS,
  FETCH_RECIPES_ERROR,
  FETCH_RECIPE_LOADING,
  FETCH_RECIPE_SUCCESS,
  FETCH_RECIPE_ERROR,
  POST_RECIPE_LOADING,
  POST_RECIPE_SUCCESS,
  POST_RECIPE_ERROR,

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
  TOGGLE_STEPS_FIELDS
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

export const fetchRecipesError = () => {
  return {
    type: FETCH_RECIPES_ERROR
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
        dispatch(fetchRecipesError());
      });
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

export const fetchRecipeError = () => {
  return {
    type: FETCH_RECIPE_ERROR
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
        dispatch(fetchRecipeError());
      });
  };
};

export const postRecipeLoading = () => {
  return {
    type: POST_RECIPE_LOADING
  };
};

export const postRecipeSuccess = () => {
  return {
    type: POST_RECIPE_SUCCESS
  };
};

export const postRecipeError = () => {
  return {
    type: POST_RECIPE_ERROR
  };
};

export const postRecipe = (recipe: recipeArrType, recipePicture?: File) => {
  return (dispatch: Dispatch<IAction>) => {
    dispatch(postRecipeLoading());

    if (!recipePicture) {
      axios
        .post("/recipe", recipe)
        .then(response => {
          dispatch(postRecipeSuccess());
          return response;
        })

        .catch(e => {
          console.log("error:", e);
          dispatch(postRecipeError());
        });
    } else {
      const config = {
        headers: { "content-type": "multipart/form-data" }
      };

      axios
        .post("/recipe", recipe)
        .then(response => {
          return axios.post(
            `/recipes/${response.data._id}/upload`,
            recipePicture,
            config
          );
        })
        .then(response => {
          dispatch(postRecipeSuccess());
          return response;
        })
        .catch(e => {
          console.log("error:", e);
          dispatch(postRecipeError());
        });
    }
  };
};
