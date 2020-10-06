import React, { ReactElement, ReactNode } from "react";

import Styles from "./ConfirmationCard.module.scss";

interface Props {
  children: ReactNode;
}

export default function ConfirmationCard({ children }: Props): ReactElement {
  return (
    <div className={Styles.ConfirmationCard}>
      <p>
        You will not be able to change the recipe after submission, are you sure
        you want to submit the recipe?
      </p>

      {children}
    </div>
  );
}
