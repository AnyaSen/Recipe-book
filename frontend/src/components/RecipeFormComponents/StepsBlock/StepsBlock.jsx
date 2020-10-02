import React, { useState, useEffect } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Styles from "./StepsBlock.module.scss";

import RecipeStep from "../../shared/RecipeStep";
import SecondaryButton from "../../shared/Buttons/SecondaryButton";
import AdditionalButton from "../../shared/Buttons/AdditionalButton";
import TextArea from "../../shared/TextArea";
import InputError from "../../shared/InputError";

const createRenderer = render => ({ input, meta, placeholder }) => (
  <div>
    {render(input, placeholder)}
    {meta.error && meta.submitFailed && <span>{meta.error}</span>}
  </div>
);

const renderTextArea = createRenderer((input, placeholder) => (
  <TextArea input={input} placeholder={placeholder} />
));

let StepsBlock = ({ stepValue, clearFields }) => {
  const [stepsArr, setStepsArr] = useState([]);
  const [stepsError, setStepsError] = useState("");
  const [showStepFields, setShowStepFields] = useState(true);

  const addSteps = () => {
    setStepsError("");

    if (!stepValue || stepValue === "") {
      setStepsError("Fill the textarea with the description of a step");
      return;
    }

    const newStep = {
      step: stepValue,
      id: uuidv4()
    };

    setStepsArr([...stepsArr, newStep]);

    setShowStepFields(false);

    clearFields("create-recipe-form", false, false, "step");

    return stepsArr;
  };

  const deleteStep = id => {
    const filteredSteps = stepsArr.filter(step => step.id !== id);

    setStepsArr(filteredSteps);
  };

  useEffect(() => {
    if (stepsArr.length === 0) {
      setShowStepFields(true);
    }
  }, [stepsArr.length]);

  return (
    <div className={Styles.RecipeInfo}>
      <h2>PREPARATION:</h2>

      <div className={Styles.preparation}>
        {stepsArr.map((stepItem, index) => {
          const { step, id } = stepItem;

          return (
            <div className={Styles.RecipeStep}>
              <RecipeStep key={id} text={step} number={index + 1} />{" "}
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
              onClick={() => setShowStepFields(!showStepFields)}
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

export default StepsBlock;
