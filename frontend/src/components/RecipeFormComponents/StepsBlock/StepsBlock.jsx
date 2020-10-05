import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import Styles from "./StepsBlock.module.scss";

import RecipeStep from "../../shared/RecipeStep";
import SecondaryButton from "../../shared/Buttons/SecondaryButton";
import AdditionalButton from "../../shared/Buttons/AdditionalButton";
import TextArea from "../../shared/TextArea";
import InputError from "../../shared/InputError";
import {
  setStepsArr,
  setStepsError,
  showStepFields
} from "../../../redux/actions";

const createRenderer = render => ({ input, meta, placeholder }) => (
  <div>
    {render(input, placeholder)}
    {meta.error && meta.submitFailed && <span>{meta.error}</span>}
  </div>
);

const renderTextArea = createRenderer((input, placeholder) => (
  <TextArea input={input} placeholder={placeholder} />
));

let StepsBlock = ({
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

  const deleteStep = id => {
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
                text="Delete"
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
              onClick={() => toggleShowFields(!showStepFields)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

StepsBlock = reduxForm({
  form: "create-recipe-form"
})(StepsBlock);

const selector = formValueSelector("create-recipe-form");
StepsBlock = connect(state => {
  const stepValue = selector(state, "step");

  return {
    stepValue
  };
})(StepsBlock);

const mapStateToProps = state => {
  const { stepsArr, stepsError, showStepFields } = state.formValues;
  return { stepsArr, stepsError, showStepFields };
};

const mapDispatchToProps = dispatch => ({
  setSteps: stepsArr => {
    dispatch(setStepsArr(stepsArr));
  },

  setError: errorMessage => {
    dispatch(setStepsError(errorMessage));
  },

  hideError: () => {
    dispatch(setStepsError(""));
  },

  hideFields: () => {
    dispatch(showStepFields(false));
  },

  showFields: () => {
    dispatch(showStepFields(true));
  },

  toggleShowFields: payload => {
    dispatch(showStepFields(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(StepsBlock);
