import { stepsType } from "./../../../types";

export interface MapStatePropsType {
  stepsArr: Array<stepsType>;
  stepsError: string;
  showStepFields: boolean;
}

export interface ownPropsType {
  stepValue: string;
  clearFields: (
    form: String,
    keepTouched: boolean,
    persistentSubmitErrors: boolean,
    fieldOne: String
  ) => void;
  setSteps: (stepsArr: Array<stepsType>) => void;
  setError: (errorMessage: string) => void;
  hideError: () => void;
  hideFields: () => void;
  showFields: () => void;
  toggleShowFields: () => void;

  // showStepFields: () => void;
}
