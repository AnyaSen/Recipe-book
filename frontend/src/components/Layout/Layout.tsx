import React, { ReactElement, ReactNode } from "react";

import Styles from "./Layout.module.scss";

import Footer from "./Footer";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props): ReactElement {
  return (
    <div className={Styles.Layout}>
      <Navbar />
      <div className={Styles.children}>{children}</div>
      <Footer />
    </div>
  );
}
