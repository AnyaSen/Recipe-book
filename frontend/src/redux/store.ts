import { createStore, combineReducers } from "redux";
import rootReducer from "./reducers/rootReducer";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  app: rootReducer,
  form: formReducer
});

export type IAppState = ReturnType<typeof reducers>;

export const store = createStore(reducers);
