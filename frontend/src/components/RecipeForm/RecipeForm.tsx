import React, { useState } from "react";

import Styles from "./RecipeForm.module.scss";

import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { IAppState } from "../../redux/store";
import { connect } from "react-redux";
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
import { renderInput, renderInputSmall } from "./renders/input/renderInput";
import { FORM_NAME } from "../../constant";

export interface MapStatePropsType {
  isSendingLoading: boolean;
  isSendingError: boolean;
}

let RecipeForm: React.FC<InjectedFormProps & MapStatePropsType> = ({
  handleSubmit,
  submitting,
  isSendingLoading,
  isSendingError
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const confCardRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
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
          {/* 
  // @ts-ignore */}

          <IngredientsBlock />
        </div>

        <div className={Styles.RecipeInfo}>
          {/* 
  // @ts-ignore */}
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

const mapStateToProps = (state: IAppState): MapStatePropsType => {
  const { isSendingLoading, isSendingError } = state.formValues;
  return { isSendingLoading, isSendingError };
};

export default compose(
  reduxForm({
    form: FORM_NAME
  }),
  connect(mapStateToProps)
)(RecipeForm);
