import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import Styles from "./StepsBlock.module.scss";

import RecipeStep from "../../shared/RecipeStep";
import SecondaryButton from "../../shared/Buttons/SecondaryButton";
import AdditionalButton from "../../shared/Buttons/AdditionalButton";
import TextArea from "../../shared/TextArea";
import InputError from "../../shared/InputError";

import {
  setStepsArr,
  setStepsErrorMessage,
  showStepFields,
  closeStepFields,
  toggleStepFields,
  IAction
} from "../../../redux/actions";
import { createRendererType, stepsType } from "../../../types";
import { ownPropsType, MapStatePropsType } from "./types";
import { Dispatch } from "redux";
import { IAppState } from "../../../redux/store";

const createRenderer: createRendererType = render => ({
  input,
  placeholder
}) => <div>{render(input, placeholder)}</div>;

const renderTextArea = createRenderer(
  (input: React.Component | React.FC, placeholder: string) => (
    <TextArea input={input} placeholder={placeholder} />
  )
);

let StepsBlock: React.FC<MapStatePropsType & ownPropsType> = ({
  stepValue,
  clearFields,
  stepsArr,
  stepsError,
  showStepFields,
  setSteps,
  setError,
  hideError,
  hideFields,
  showFields,
  toggleShowFields
}) => {
  const addSteps = () => {
    hideError();

    if (!stepValue || stepValue === "") {
      setError("Enter the description of the step. Then press 'Add'");
      return;
    }

    const newStep = {
      step: stepValue,
      id: uuidv4()
    };

    setSteps([...stepsArr, newStep]);

    hideFields();

    clearFields("create-recipe-form", false, false, "step");

    return stepsArr;
  };

  const deleteStep = (id: string | undefined) => {
    const filteredSteps = stepsArr.filter(step => step.id !== id);

    setSteps(filteredSteps);
  };

  useEffect(() => {
    if (stepsArr.length === 0) {
      showFields();
    }
  }, [stepsArr.length]);

  return (
    <div className={Styles.RecipeInfo}>
      <h2>PREPARATION:</h2>

      <div className={Styles.preparation}>
        {stepsArr.map((stepItem, index) => {
          const { step, id } = stepItem;

          return (
            <div className={Styles.RecipeStep} key={id}>
              <RecipeStep text={step} number={index + 1} />{" "}
              <AdditionalButton
                variant="close"
                onClick={() => deleteStep(id)}
              />
            </div>
          );
        })}

        <div className={Styles.stepInputsContainer}>
          {showStepFields && (
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
              />
            </div>
          )}

          {stepsArr.length > 0 && (
            <AdditionalButton
              variant={showStepFields && "close"}
              type="button"
              onClick={() => toggleShowFields()}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const selector = formValueSelector("create-recipe-form");
StepsBlock = connect(state => {
  const stepValue = selector(state, "step");

  return {
    stepValue
  };
})(StepsBlock);

const mapStateToProps = (state: IAppState): MapStatePropsType => {
  const { stepsArr, stepsError, showStepFields } = state.formValues;
  return { stepsArr, stepsError, showStepFields };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  setSteps: (stepsArr: Array<stepsType>) => {
    dispatch(setStepsArr(stepsArr));
  },

  setError: (errorMessage: string) => {
    dispatch(setStepsErrorMessage(errorMessage));
  },

  hideError: () => {
    dispatch(setStepsErrorMessage(""));
  },

  hideFields: () => {
    dispatch(closeStepFields());
  },

  showFields: () => {
    dispatch(showStepFields());
  },

  toggleShowFields: () => {
    dispatch(toggleStepFields());
  }
});

export default compose(
  reduxForm({
    form: "create-recipe-form"
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(StepsBlock);