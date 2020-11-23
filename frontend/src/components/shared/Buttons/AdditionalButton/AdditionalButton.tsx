import React, { ReactElement } from 'react';

import Styles from './AdditionalButton.module.scss';

interface Props {
  variant?: string;
  dataCy?: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
}

export default function AdditionalButton({
  type,
  variant,
  onClick,
  dataCy
}: Props): ReactElement {
  return (
    <button
      className={variant === 'close' ? Styles.ButtonClose : Styles.ButtonPlus}
      type={type}
      onClick={onClick}
      data-cy={dataCy}
    >
      {variant === 'close' ? 'x' : '+'}
    </button>
  );
}
