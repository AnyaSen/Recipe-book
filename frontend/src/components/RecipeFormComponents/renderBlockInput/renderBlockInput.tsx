import React from "react";
import { createRendererType } from "../../../types";

import TextArea from "../../shared/TextArea";
import InputField from "../../shared/InputField";

const createRenderer: createRendererType = render => ({
  input,
  placeholder
}) => <div>{render(input, placeholder)}</div>;

export const renderTextArea = createRenderer(
  (input: React.Component | React.FC, placeholder: string) => (
    <TextArea input={input} placeholder={placeholder} />
  )
);

export const renderInput = createRenderer(
  (input: React.Component | React.FC, placeholder: string) => (
    <InputField input={input} placeholder={placeholder} />
  )
);
