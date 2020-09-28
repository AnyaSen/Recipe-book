import React, { useState } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { required } from "../../../services/validation";

import Styles from "./StepsBlock.module.scss";
import RecipeStep from "../../shared/RecipeStep";

const createRenderer = render => ({ input, meta, placeholder }) => (
  <div>
    {render(input, placeholder)}
    {meta.error && meta.submitFailed && <span>{meta.error}</span>}
  </div>
);

const renderTextArea = createRenderer(input => <textarea {...input} />);

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

      {stepsError && <p>{stepsError}</p>}

      <div className={Styles.preparation}>
        {stepsArr.map((step, index) => {
          return <RecipeStep key={index} text={step} number={index + 1} />;
        })}

        <div>
          {showStepFields && (
            <div className={Styles.ingridientInputs}>
              <Field
                name="step"
                component={renderTextArea}
                type="text"
                validate={required}
              />

              <button type="button" onClick={addSteps}>
                Add
              </button>
            </div>
          )}

          {stepsArr.length > 0 && (
            <button
              type="button"
              onClick={() => setShowStepFields(!showStepFields)}
            >
              {showStepFields ? "x" : "+"}
            </button>
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
