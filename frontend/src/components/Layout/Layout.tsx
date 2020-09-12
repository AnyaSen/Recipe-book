import React, { ReactElement, ReactNode } from "react";

import Styles from "./Layout.module.scss";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
  buttonText: string;
  withLink?: boolean;
  linkTo?: string;
}

export default function Layout({
  children,
  buttonText,
  withLink,
  linkTo
}: Props): ReactElement {
  return (
    <div className={Styles.Layout}>
      <Navbar buttonText={buttonText} withLink={withLink} linkTo={linkTo} />
      <div className={Styles.children}>{children}</div>
      <Footer />
    </div>
  );
}
