import { AppEvents } from "../events";
import { IAction } from "../actions";

const initState: IState = {
  recipes: []
};

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
}

const rootReducer = (state: IState = initState, action: IAction) => {
  switch (action.type) {
    case AppEvents.SET_RECIPES:
      return { ...state, recipes: action.payload };

    default:
      return { ...state };
  }
};

export default rootReducer;
