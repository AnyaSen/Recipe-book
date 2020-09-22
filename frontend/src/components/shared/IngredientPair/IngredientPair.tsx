import React, { ReactElement } from "react";

import Styles from "./IngredientPair.module.scss";

interface Props {
  quantity: string;
  ingredient: string;
}
export default function IngredientPair({
  quantity,
  ingredient
}: Props): ReactElement {
  return (
    <div className={Styles.IngredientPair}>
      <p>{quantity} </p>
      <p>{ingredient}</p>
    </div>
  );
}
