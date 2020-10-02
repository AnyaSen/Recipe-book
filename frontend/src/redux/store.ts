import { createStore, combineReducers } from "redux";
import rootReducer from "./reducers/rootReducer";
import formValuesReducer from "./reducers/formValuesReducer";
import { reducer as formReducer } from "redux-form";

const reducers = combineReducers({
  app: rootReducer,
  form: formReducer,
  formValues: formValuesReducer
});

export type IAppState = ReturnType<typeof reducers>;

export const store = createStore(
  reducers,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
