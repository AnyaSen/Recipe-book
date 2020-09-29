import React, { useState } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import Styles from "./StepsBlock.module.scss";

import RecipeStep from "../../shared/RecipeStep";
import SecondaryButton from "../../shared/Buttons/SecondaryButton";
import AdditionalButton from "../../shared/Buttons/AdditionalButton";
import TextArea from "../../shared/TextArea";

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

    setStepsArr([...stepsArr, stepValue]);

    setShowStepFields(false);

    clearFields("create-recipe-form", false, false, "step");

    return stepsArr;
  };

  return (
    <div className={Styles.RecipeInfo}>
      <h2>PREPARATION:</h2>

      <div className={Styles.preparation}>
        {stepsArr.map((step, index) => {
          return <RecipeStep key={index} text={step} number={index + 1} />;
        })}

        <div className={Styles.stepInputsContainer}>
          {showStepFields && (
            <div className={Styles.stepInputs}>
              <div>
                {stepsError && <p>{stepsError}</p>}

                <Field
                  name="step"
                  component={renderTextArea}
                  type="text"
                  placeholder="Describe a step..."
                />
              </div>
              <SecondaryButton type="submit" text="Add" onClick={addSteps} />
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
