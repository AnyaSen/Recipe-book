import React, { useEffect, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Field,
  reduxForm,
  formValueSelector,
  InjectedFormProps,
  change
} from "redux-form";
import { connect, useSelector, useDispatch } from "react-redux";

import Styles from "./StepsBlock.module.scss";

import RecipeStep from "../../shared/RecipeStep";
import SecondaryButton from "../../shared/Buttons/SecondaryButton";
import AdditionalButton from "../../shared/Buttons/AdditionalButton";
import InputError from "../../shared/InputError";

import {
  setStepsArr,
  setStepsErrorMessage,
  showStepFields,
  closeStepFields,
  toggleStepFields,
  IAction
} from "../../../redux/actions";
import { stepsType } from "../../../types";
import { Dispatch } from "redux";
import { IAppState } from "../../../redux/store";
import { renderTextArea } from "../renderBlockInput/renderBlockInput";

interface ownProps {
  stepValue: string;
  clearFields: (
    form: String,
    keepTouched: boolean,
    persistentSubmitErrors: boolean,
    fieldOne: String
  ) => void;
}

let StepsBlock: React.FC<InjectedFormProps & ownProps> = ({ stepValue }) => {
  const stepsArr: Array<stepsType> = useSelector(
    (state: IAppState) => state.formValues.stepsArr
  );
  const stepsError: string = useSelector(
    (state: IAppState) => state.formValues.stepsError
  );
  const showSteps = useSelector(
    (state: IAppState) => state.formValues.showStepFields
  );

  const dispatch: Dispatch<IAction> = useDispatch();

  const clearField = useCallback(
    (field: string) => dispatch(change("create-recipe-form", field, "")),
    [dispatch]
  );

  const addSteps = () => {
    dispatch(setStepsErrorMessage(""));

    if (!stepValue || stepValue === "") {
      dispatch(
        setStepsErrorMessage(
          "Enter the description of the step. Then press 'Add'"
        )
      );
      return;
    }

    const newStep = {
      step: stepValue,
      id: uuidv4()
    };

    dispatch(setStepsArr([...stepsArr, newStep]));

    dispatch(closeStepFields());

    clearField("step");

    return stepsArr;
  };

  const deleteStep = (id: string | undefined) => {
    const filteredSteps = stepsArr.filter(step => step.id !== id);

    dispatch(setStepsArr(filteredSteps));
  };

  const handleToggleClick = () => {
    dispatch(toggleStepFields());

    dispatch(setStepsErrorMessage(""));
  };

  const stepsArrLength = stepsArr.length;

  useEffect(() => {
    if (stepsArrLength === 0) {
      dispatch(showStepFields());
    }
  }, [stepsArrLength]);

  return (
    <div className={Styles.RecipeInfo}>
      <h2>PREPARATION:</h2>

      <div className={Styles.preparation}>
        {stepsArr.map((stepItem, index) => {
          const { step, id } = stepItem;

          return (
            <div
              className={Styles.RecipeStep}
              key={id}
              data-cy={`step-${index}`}
            >
              <RecipeStep text={step} number={index + 1} />{" "}
              <AdditionalButton
                variant="close"
                onClick={() => deleteStep(id)}
                dataCy={`delete-step-${index}`}
              />
            </div>
          );
        })}

        <div className={Styles.stepInputsContainer}>
          {showSteps && (
            <div className={Styles.stepInputs}>
              <div>
                {stepsError && <InputError text={stepsError} />}

                <Field
                  name="step"
                  component={renderTextArea}
                  type="text"
                  placeholder="Describe a step..."
                />
              </div>
              <SecondaryButton
                type="button"
                text="Add"
                onClick={addSteps}
                pink
                dataCy="add-step"
              />
            </div>
          )}

          {stepsArrLength > 0 && (
            <AdditionalButton
              variant={showSteps ? "close" : ""}
              type="button"
              onClick={handleToggleClick}
              dataCy="toggle-new-textarea"
            />
          )}
        </div>
      </div>
    </div>
  );
};

const selector = formValueSelector("create-recipe-form");
StepsBlock = connect(state => {
  const stepValue: string = selector(state, "step");

  return {
    stepValue
  };
})(StepsBlock);

export default StepsBlock = connect(reduxForm({ form: "create-recipe-form" }))(
  StepsBlock
);
