import { ingredientsType } from "../../../types";

export interface MapStatePropsType {
  ingredientsArr: Array<ingredientsType>;
  ingredientsError: string;
  showIngredientFields: boolean;
}

export interface ownPropsType {
  ingredientValue: string;
  quantityValue: string;
  clearFields: (
    form: String,
    keepTouched: boolean,
    persistentSubmitErrors: boolean,
    fieldOne: String,
    fieldTwo: String
  ) => void;
  setIngredients: (ingredientsArr: Array<ingredientsType>) => void;
  setError: (errorMsg: string) => void;
  hideError: () => void;
  hideFields: () => void;
  showFields: () => void;
  toggleShowFields: () => void;
}
