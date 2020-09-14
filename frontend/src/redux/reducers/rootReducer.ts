import { AppEvents } from "../events";
import { IAction } from "../actions";

export interface IState {
  recipes: Array<{
    name: string;
    ingridients: Array<{
      ingredient: string;
      quantity: string;
    }>;
    time: string;
    portionsNumber: number;
    steps: Array<string>;
    img: string;
  }>;
  isLoading: boolean;
  isError: boolean;
}

const initState: IState = {
  recipes: [],
  isLoading: true,
  isError: false
};

const rootReducer = (state: IState = initState, action: IAction) => {
  switch (action.type) {
    case AppEvents.SET_RECIPES:
      return { ...state, recipes: action.payload };

    case AppEvents.SET_LOADING:
      return { ...state, isLoading: action.payload };

    case AppEvents.SET_ERROR:
      return { ...state, isError: action.payload };

    default:
      return { ...state };
  }
};

export default rootReducer;
