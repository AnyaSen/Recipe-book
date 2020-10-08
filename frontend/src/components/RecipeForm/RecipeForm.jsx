import React, { useState } from "react";
import { connect } from "react-redux";

import Styles from "./RecipeForm.module.scss";

import { Field, reduxForm } from "redux-form";
import { required, requiredNumber } from "../../services/validation";

import Layout from "../Layout";
import StaticPicture from "../shared/StaticPicture";
import Button from "../shared/Buttons/Button";
import IngredientsBlock from "../RecipeFormComponents/IngredientsBlock/IngredientsBlock";
import StepsBlock from "../RecipeFormComponents/StepsBlock/StepsBlock";
import InputField from "../shared/InputField";
import AdditionalButton from "../shared/Buttons/AdditionalButton";
import LoadingPage from "../shared/LoadingPage";
import ErrorPage from "../shared/ErrorPage";
import ConfirmationCard from "../RecipeFormComponents/ConfirmationCard";

const createRenderer = render => ({ input, meta, placeholder }) => (
  <div className={meta.error && meta.submitFailed ? Styles.error : ""}>
    {render(input, placeholder)}
    {meta.error === "number" && meta.submitFailed && (
      <p>Please, enter a number</p>
    )}
  </div>
);

const renderInput = createRenderer((input, placeholder) => (
  <InputField input={input} placeholder={placeholder} />
));

const renderInputSmall = createRenderer((input, placeholder) => (
  <InputField input={input} placeholder={placeholder} small />
));

const renderFileInput = createRenderer(input => (
  <input input={input} type="file" />
));

let RecipeForm = ({
  handleSubmit,
  submitting,
  isSendingLoading,
  isSendingError
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (isSendingLoading) return <LoadingPage />;
  if (isSendingError) return <ErrorPage />;

  return (
    <Layout buttonText="Back to all" withLink linkTo="/" withButton>
      <form
        onSubmit={handleSubmit}
        onKeyPress={event => {
          if (event.which === 13) {
            event.preventDefault();
          }
        }}
      >
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
              {/* <AdditionalButton
                type="button"
                onClick={() => console.log("clicked")}
              /> */}
              <Field name="file" component={renderFileInput} />
            </StaticPicture>

            <div className={Styles.timeAndPortions}>
              <Field
                name="time"
                component={renderInputSmall}
                validate={required}
                placeholder="time"
              />

              <Field
                name="portionsNumber"
                component={renderInput}
                validate={requiredNumber}
                placeholder="no of portions"
              />
            </div>
          </div>

          <IngredientsBlock />
        </div>

        <div className={Styles.RecipeInfo}>
          <StepsBlock />

          {showConfirmation ? (
            <ConfirmationCard>
              <Button text="Submit" type="submit" disabled={submitting} />

              <Button
                text="Cancel"
                onClick={() => setShowConfirmation(false)}
              />
            </ConfirmationCard>
          ) : (
            <Button
              text="Continue"
              type="button"
              pink
              onClick={() => setShowConfirmation(true)}
            />
          )}
        </div>
      </form>
    </Layout>
  );
};

const mapStateToProps = state => {
  const { isSendingLoading, isSendingError } = state.formValues;
  return { isSendingLoading, isSendingError };
};

RecipeForm = reduxForm({
  form: "create-recipe-form"
})(RecipeForm);

export default connect(mapStateToProps)(RecipeForm);
