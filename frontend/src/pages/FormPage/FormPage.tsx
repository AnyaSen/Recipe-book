import React, { ReactElement, useState } from "react";
import Styles from "./FormPage.module.scss";

import Layout from "../../components/Layout";
import { Field, reduxForm, InjectedFormProps, SubmitHandler } from "redux-form";
import StaticPicture from "../../components/shared/StaticPicture";

interface Props extends InjectedFormProps {
  handleSubmit: SubmitHandler<{}, {}, string>;
}

interface FormData {
  steps?: Array<string>;
}

const onSubmit = (values: FormData) => {
  alert(JSON.stringify(values));
};

function FormPage({ handleSubmit }: Props): ReactElement {
  const [stepsArr, setStepsArr] = useState([""]);

  return (
    <Layout buttonText="Back to all" withLink linkTo="/" withButton>
      <form onSubmit={handleSubmit}>
        <div className={Styles.FormHeader}>
          <div className={Styles.nameAndPicture}>
            <Field
              name="name"
              component="input"
              type="text"
              placeholder="Name"
            />

            <StaticPicture horizontal />
            <div className="labels">
              <Field
                name="time"
                component="input"
                type="text"
                placeholder="Time"
              />

              <Field
                name="portions"
                component="input"
                type="text"
                placeholder="Portions"
              />
            </div>
          </div>
          <div className={Styles.ingridients}>
            <h2>Ingredients:</h2>
            <div className={Styles.ingridientPairs}>
              <Field
                name="quantity"
                component="input"
                type="text"
                placeholder="qty"
              />

              <Field
                name="ingredient"
                component="input"
                type="text"
                placeholder="ingredient"
              />

              <button>Add</button>
              <button>+</button>
            </div>
          </div>
        </div>
        <div className={Styles.RecipeInfo}>
          <h2>Preparation:</h2>
          <div className={Styles.preparation}>
            <div>
              {stepsArr.map((step, index) => {
                return (
                  <div key={index}>
                    <h3>Step {index + 1}</h3>
                    <Field
                      name={`step ${index + 1}`}
                      component="textarea"
                      type="text"
                    />
                    <button>Add</button>
                    <button>+</button>
                    <p>{step}</p>{" "}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </form>
    </Layout>
  );
}

export default reduxForm({
  form: "create-recipe-form",
  onSubmit
})(FormPage);
