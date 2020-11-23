import React, { ReactElement, ReactNode, MutableRefObject } from 'react';

import Styles from './ConfirmationCard.module.scss';

interface Props {
  children: ReactNode;
  confRef?: MutableRefObject<HTMLDivElement | null>;
}

export default function ConfirmationCard({
  children,
  confRef
}: Props): ReactElement {
  return (
    <div
      className={Styles.ConfirmationCard}
      ref={confRef}
      data-cy="confirmation-card"
    >
      <p>
        You will not be able to change the recipe after submission, are you sure
        you want to submit the recipe?
      </p>

      {children}
    </div>
  );
}
