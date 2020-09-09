import React, { ReactElement } from "react";

import Styles from "./Recipe.module.scss";

interface Props {
  name: string;
}
export default function Recipe({ name }: Props): ReactElement {
  return (
    <div className={Styles.Recipe}>
      <div>
        <h1>Recipe</h1>
        <p>{name}</p>
      </div>
    </div>
  );
}
