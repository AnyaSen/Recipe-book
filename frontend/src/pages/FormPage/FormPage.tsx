import React, { ReactElement } from "react";
import Styles from "./FormPage.module.scss";

import Layout from "../../components/Layout";
import { Field, reduxForm, SubmitHandler } from "redux-form";
import StaticPicture from "../../components/shared/StaticPicture";
import Button from "../../components/shared/Button";

interface Props {
  handleSubmit: SubmitHandler<FormData, {}, string>;
  submitting: boolean;
}

interface FormData {
  name: string;
  ingredient: string;
  quantity: string;
  time: string;
  portionsNumber: number;
  step: string;
  img?: string;
}

interface InputType {
  input: object;
  meta: {
    error: boolean;
    touched: boolean;
  };
  placeholder: string;
}

const onSubmit = (values: FormData) => {
  alert(JSON.stringify(values));
};

const required = (value: string | number) => {
  if (!value || value === "") {
    return "This field is required";
  }
};

const createRenderer = (render: any) => ({
  input,
  meta,
  placeholder
}: InputType) => (
  <div>
    {render(input, placeholder)}
    {meta.error && meta.touched && <span>{meta.error}</span>}
  </div>
);

const renderInput = createRenderer((input: object, placeholder: string) => (
  <input {...input} placeholder={placeholder} />
));

const renderTextArea = createRenderer((input: object) => (
  <textarea {...input} />
));

function FormPage({ handleSubmit, submitting }: Props): ReactElement {
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
          <div className={Styles.ingridients}>
            <h2>Ingredients:</h2>
            <div className={Styles.ingridientPairs}>
              <Field
                name="quantity"
                component={renderInput}
                validate={required}
                placeholder="qty"
              />

              <Field
                name="ingredient"
                component={renderInput}
                validate={required}
                placeholder="ingredient"
              />

              <button type="button">Add</button>
              <button type="button">+</button>
            </div>
          </div>
        </div>
        <div className={Styles.RecipeInfo}>
          <h2>Preparation:</h2>
          <div className={Styles.preparation}>
            <div>
              <h3>Step 1</h3>
              <Field
                name="step"
                component={renderTextArea}
                type="text"
                validate={required}
              />
              <button type="button">Add</button>
              <button type="button">+</button>
            </div>
          </div>
          <Button text="Submit" type="submit" disabled={submitting} />
        </div>
      </form>
    </Layout>
  );
}

export default reduxForm({
  form: "create-recipe-form",
  onSubmit
})(FormPage);
