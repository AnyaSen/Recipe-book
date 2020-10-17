import { AppEvents } from "../events";
import { IAction } from "../actions";
import { ingredientsType, stepsType } from "../../types";

export interface IState {
  ingredientsArr: Array<ingredientsType>;
  ingredientsError: string;
  showIngredientFields: boolean;

  stepsArr: Array<stepsType>;
  stepsError: boolean;
  showStepFields: boolean;
}

const initState: IState = {
  ingredientsArr: [],
  ingredientsError: "",
  showIngredientFields: true,

  stepsArr: [],
  stepsError: false,
  showStepFields: true
};

const formValuesReducer = (state: IState = initState, action: IAction) => {
  switch (action.type) {
    case AppEvents.SET_INGR_ARR:
      return { ...state, ingredientsArr: action.payload };

    case AppEvents.SET_INGR_ERR:
      return { ...state, ingredientsError: action.payload };

    case AppEvents.SHOW_INGR_FIELDS:
      return { ...state, showIngredientFields: true };

    case AppEvents.CLOSE_INGR_FIELDS:
      return { ...state, showIngredientFields: false };

    case AppEvents.TOGGLE_INGR_FIELDS:
      return { ...state, showIngredientFields: !state.showIngredientFields };

    case AppEvents.SET_STEPS_ARR:
      return { ...state, stepsArr: action.payload };

    case AppEvents.SET_STEPS_ERR:
      return { ...state, stepsError: action.payload };

    case AppEvents.SHOW_STEPS_FIELDS:
      return { ...state, showStepFields: true };

    case AppEvents.CLOSE_STEPS_FIELDS:
      return { ...state, showStepFields: false };

    case AppEvents.TOGGLE_STEPS_FIELDS:
      return { ...state, showStepFields: !state.showStepFields };

    default:
      return { ...state };
  }
};

export default formValuesReducer;
