import React from "react";
import Styles from "./RecipeForm.module.scss";

import { Field, reduxForm } from "redux-form";
import { required } from "../../services/validation";

import Layout from "../Layout";
import StaticPicture from "../shared/StaticPicture";
import Button from "../shared/Buttons/Button";
import IngredientsBlock from "../RecipeFormComponents/IngredientsBlock/IngredientsBlock";
import StepsBlock from "../RecipeFormComponents/StepsBlock/StepsBlock";
import InputField from "../shared/InputField";
import AdditionalButton from "../shared/Buttons/AdditionalButton";

const createRenderer = render => ({ input, meta, placeholder }) => (
  <div className={meta.error && meta.submitFailed ? Styles.error : ""}>
    {render(input, placeholder)}
  </div>
);

const renderInput = createRenderer((input, placeholder) => (
  <InputField input={input} placeholder={placeholder} />
));

const renderInputSmall = createRenderer((input, placeholder) => (
  <InputField input={input} placeholder={placeholder} small />
));

let RecipeForm = ({ handleSubmit, submitting }) => {
  return (
    <Layout buttonText="Back to all" withLink linkTo="/" withButton>
      <form onSubmit={handleSubmit}>
        <div className={Styles.FormHeader}>
          <div className={Styles.generalIfo}>
            <Field
              name="name"
              component={renderInput}
              validate={required}
              placeholder="Name"
            />
            <StaticPicture addPicture>
              {" "}
              <AdditionalButton
                type="button"
                onClick={() => console.log("clicked")}
              />
            </StaticPicture>

            <div className={Styles.timeAndPortions}>
              <Field
                name="time"
                component={renderInputSmall}
                validate={required}
                placeholder="time"
              />

              <div className={Styles.portions}>
                <Field
                  name="portionsNumber"
                  component={renderInputSmall}
                  validate={required}
                  placeholder="no"
                />{" "}
                <p>portions</p>
              </div>
            </div>
          </div>

          <IngredientsBlock />
        </div>

        <div className={Styles.RecipeInfo}>
          <StepsBlock />

          <Button text="Submit" type="submit" disabled={submitting} pink />
        </div>
      </form>
    </Layout>
  );
};

export default RecipeForm = reduxForm({
  form: "create-recipe-form"
})(RecipeForm);
