import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
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
  composeWithDevTools(applyMiddleware(thunk))
);
