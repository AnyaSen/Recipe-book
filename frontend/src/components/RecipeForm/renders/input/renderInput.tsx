import React from "react";

import Styles from "./renderInput.module.scss";

import InputField from "../../../shared/InputField";
import { createRendererType } from "../../../../types";

const createRenderer: createRendererType = render => ({
  input,
  meta,
  placeholder
}) => (
  <div className={meta.error && meta.submitFailed ? Styles.error : ""}>
    {render(input, placeholder)}
    {meta.error === "number" && meta.submitFailed && (
      <p data-cy="error-number-type">Please, enter a number</p>
    )}
  </div>
);

export const renderInput = createRenderer(
  (input: React.Component | React.FC, placeholder: string) => (
    <InputField input={input} placeholder={placeholder} />
  )
);
