import React, { ReactElement } from 'react';

import Styles from './Footer.module.scss';

export default function Footer(): ReactElement {
  return (
    <p className={Styles.Footer}>
      Developed and Designed by
      <a
        href="https://www.linkedin.com/in/anna-senchikhina/"
        target="_blank"
        rel="noopener noreferrer"
        data-cy="link-to-linkedin"
      >
        {' '}
        Anna Senchikhina
      </a>
    </p>
  );
}
