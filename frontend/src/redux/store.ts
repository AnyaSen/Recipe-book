import { createStore, combineReducers } from "redux";
import rootReducer from "./reducers/rootReducer";

const reducers = combineReducers({
  app: rootReducer
});

export type IAppState = ReturnType<typeof reducers>;

export const store = createStore(reducers);
