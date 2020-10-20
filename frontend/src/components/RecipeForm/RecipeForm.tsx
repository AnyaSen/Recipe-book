import React, { useState } from "react";

import Dropzone from "react-dropzone";

import Styles from "./RecipeForm.module.scss";

import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { IAppState } from "../../redux/store";
import { connect } from "react-redux";
import { compose } from "redux";
import { createRendererType, RecipeFormValuesType } from "../../types";

import { required, requiredNumber } from "../../services/validation";

import Layout from "../Layout";
import StaticPicture from "../shared/StaticPicture";
import Button from "../shared/Buttons/Button";
import IngredientsBlock from "../RecipeFormComponents/IngredientsBlock";
import StepsBlock from "../RecipeFormComponents/StepsBlock/StepsBlock";
import InputField from "../shared/InputField";
import AdditionalButton from "../shared/Buttons/AdditionalButton";
import LoadingPage from "../shared/LoadingPage";
import ErrorPage from "../shared/ErrorPage";
import ConfirmationCard from "../RecipeFormComponents/ConfirmationCard";

const createRenderer: createRendererType = render => ({
  input,
  meta,
  placeholder
}) => (
  <div className={meta.error && meta.submitFailed ? Styles.error : ""}>
    {render(input, placeholder)}
    {meta.error === "number" && meta.submitFailed && (
      <p>Please, enter a number</p>
    )}
  </div>
);

const renderInput = createRenderer(
  (input: React.Component | React.FC, placeholder: string) => (
    <InputField input={input} placeholder={placeholder} />
  )
);

const renderInputSmall = createRenderer(
  (input: React.Component | React.FC, placeholder: string) => (
    <InputField input={input} placeholder={placeholder} small />
  )
);

const renderDropzoneField = (field: any) => {
  const maxSize = 1000000;

  return (
    <div>
      <Dropzone
        onDrop={(filesToUpload, e) => field.input.onChange(filesToUpload)}
        accept="image/jpeg, image/jpg, image/png"
        minSize={0}
        maxSize={maxSize}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragReject,
          acceptedFiles,
          fileRejections
        }) => {
          const isFileTooLarge = fileRejections.length > 0;

          const isFileAccepted = acceptedFiles.length > 0;

          return (
            <div {...getRootProps()} className={Styles.dropzone}>
              <input {...getInputProps()} />
              <AdditionalButton type="button" />

              {isDragActive && !isDragReject && <h3>Drop a file</h3>}
              {isDragReject && (
                <h3>
                  The file must be <span>jpeg, jpg or png</span>
                </h3>
              )}
              {isFileAccepted && <h3>{acceptedFiles[0].name}</h3>}
              {isFileTooLarge && <p>The file is too large</p>}
            </div>
          );
        }}
      </Dropzone>
    </div>
  );
};

export interface MapStatePropsType {
  isSendingLoading: boolean;
  isSendingError: boolean;
}

let RecipeForm: React.FC<InjectedFormProps<RecipeFormValuesType> &
  MapStatePropsType> = ({
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
            <ConfirmationCard>
              <Button text="Submit" type="submit" disabled={submitting} />

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
    form: "create-recipe-form"
  }),
  connect(mapStateToProps)
)(RecipeForm);
