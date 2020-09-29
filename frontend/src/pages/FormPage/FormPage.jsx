import React from "react";
import Styles from "./FormPage.module.scss";

import { Field, reduxForm } from "redux-form";
import { required } from "../../services/validation";

import Layout from "../../components/Layout";
import StaticPicture from "../../components/shared/StaticPicture";
import Button from "../../components/shared/Buttons/Button";
import IngredientsBlock from "../../components/RecipeFormComponents/IngredientsBlock/IngredientsBlock";
import StepsBlock from "../../components/RecipeFormComponents/StepsBlock/StepsBlock";
import InputField from "../../components/shared/InputField";

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
  <InputField input={input} placeholder={placeholder} />
));

const renderInputSmall = createRenderer((input, placeholder) => (
  <InputField input={input} placeholder={placeholder} small />
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
            <Field
              name="time"
              component={renderInputSmall}
              validate={required}
              placeholder="time"
            />
            <Field
              name="portionsNumber"
              component={renderInputSmall}
              validate={required}
              placeholder="no"
            />{" "}
            <p>portions</p>
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
