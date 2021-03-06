import React, { useState, useRef, useEffect } from "react";

import Styles from "./RecipeForm.module.scss";
import time from "../../assets/img/time.svg";
import portions from "../../assets/img/portions.svg";

import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { IAppState } from "../../redux/store";
import { useSelector } from "react-redux";
import { compose } from "redux";

import { required, requiredNumber } from "../../services/validation";
import { scrollTop } from "../../services/scrollToTop";

import Layout from "../Layout";
import StaticPicture from "../shared/StaticPicture";
import Button from "../shared/Buttons/Button";
import IngredientsBlock from "../RecipeFormComponents/IngredientsBlock";
import StepsBlock from "../RecipeFormComponents/StepsBlock/StepsBlock";
import LoadingPage from "../shared/LoadingPage";
import ErrorPage from "../shared/ErrorPage";
import ConfirmationCard from "../RecipeFormComponents/ConfirmationCard";
import { renderDropzoneField } from "./renders/dropzone/renderDropzone";
import { renderInput } from "./renders/input/renderInput";
import { FORM_NAME } from "../../constants";

let RecipeForm: React.FC<InjectedFormProps> = ({
  handleSubmit,
  submitting
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const isSendingLoading = useSelector(
    (state: IAppState) => state.formValues.isSendingLoading
  );
  const isSendingError = useSelector(
    (state: IAppState) => state.formValues.isSendingError
  );

  const confCardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (showConfirmation && confCardRef.current) {
      confCardRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showConfirmation]);

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
            <StaticPicture addPicture text="No picture">
              <Field name="file" component={renderDropzoneField} />
            </StaticPicture>

            <div className={Styles.timeAndPortions}>
              <div className={Styles.timeAndPortionsBlock}>
                <img src={time} alt="time"></img>
                <Field
                  name="time"
                  component={renderInput}
                  validate={required}
                  placeholder="time of preparation"
                />
              </div>

              <div className={Styles.timeAndPortionsBlock}>
                <img
                  src={portions}
                  alt="portions"
                  className={Styles.PortionsImg}
                ></img>
                <Field
                  name="portionsNumber"
                  component={renderInput}
                  validate={requiredNumber}
                  placeholder="no. of portions"
                />
              </div>
            </div>
          </div>

          <IngredientsBlock />
        </div>

        <div className={Styles.RecipeInfo}>
          <StepsBlock />

          {showConfirmation ? (
            <ConfirmationCard confRef={confCardRef}>
              <Button
                text="Submit"
                type="submit"
                disabled={submitting}
                onClick={scrollTop}
              />

              <Button text="Close" onClick={() => setShowConfirmation(false)} />
            </ConfirmationCard>
          ) : (
            <Button
              text="Continue"
              type="button"
              onClick={() => setShowConfirmation(true)}
            />
          )}
        </div>
      </form>
    </Layout>
  );
};

export default compose(
  reduxForm({
    form: FORM_NAME
  })
)(RecipeForm);
