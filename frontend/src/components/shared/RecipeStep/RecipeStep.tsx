import React, { ReactElement } from "react";

import Styles from "./RecipeStep.module.scss";

interface Props {
  text: string | undefined;
  number: number;
}

export default function RecipeStep({ text, number }: Props): ReactElement {
  return (
    <div className={Styles.RecipeStep}>
      <h3>Step {number}</h3>
      <p>{text}</p>{" "}
    </div>
  );
}
