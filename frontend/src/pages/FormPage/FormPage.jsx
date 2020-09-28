import React from "react";
import Styles from "./FormPage.module.scss";

import { Field, reduxForm } from "redux-form";
import { required } from "../../services/validation";

import Layout from "../../components/Layout";
import StaticPicture from "../../components/shared/StaticPicture";
import Button from "../../components/shared/Button";
import IngredientsBlock from "../../components/RecipeFormComponents/IngredientsBlock/IngredientsBlock";
import StepsBlock from "../../components/RecipeFormComponents/StepsBlock/StepsBlock";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(2000);
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

const createRenderer = render => ({ input, meta, placeholder }) => (
  <div>
    {render(input, placeholder)}
    {meta.error && meta.submitFailed && <span>{meta.error}</span>}
  </div>
);

const renderInput = createRenderer((input, placeholder) => (
  <input {...input} placeholder={placeholder} />
));

let FormPage = ({ handleSubmit, submitting }) => {
  return (
    <Layout buttonText="Back to all" withLink linkTo="/" withButton>
      <form onSubmit={handleSubmit}>
        <div className={Styles.FormHeader}>
          <div className={Styles.nameAndPicture}>
            <Field
              name="name"
              component={renderInput}
              validate={required}
              placeholder="Name"
            />

            <StaticPicture horizontal />

            <div className="labels">
              <Field
                name="time"
                component={renderInput}
                validate={required}
                placeholder="Time"
              />

              <Field
                name="portionsNumber"
                component={renderInput}
                validate={required}
                placeholder="Portions"
              />
            </div>
          </div>
          <IngredientsBlock />
        </div>

        <div className={Styles.RecipeInfo}>
          <StepsBlock />

          <Button text="Submit" type="submit" disabled={submitting} />
        </div>
      </form>
    </Layout>
  );
};

export default FormPage = reduxForm({
  form: "create-recipe-form",
  onSubmit
})(FormPage);
