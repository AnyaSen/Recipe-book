import { InjectedFormProps } from "redux-form";
import { recipeArrType } from "../../types";
import { ownPropsType } from "../RecipeFormComponents/IngredientsBlock/types";

type createRendererParamsType = {
  meta: {
    error: string;
    submitFailed: boolean;
  };
  input: string | React.Component | React.FC;
  placeholder: string;
};

export type createRendererType = (
  render: any
) => (params: createRendererParamsType) => React.ReactNode;

export type MapStatePropsType = {
  isSendingLoading: boolean;
  isSendingError: boolean;
};

export interface RecipeFormValuesType {
  values: recipeArrType;
}
