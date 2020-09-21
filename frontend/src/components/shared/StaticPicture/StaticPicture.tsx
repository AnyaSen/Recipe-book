import React, { ReactElement } from "react";

import Styles from "./StaticPicture.module.scss";

export default function StaticPicture(): ReactElement {
  return (
    <div className={Styles.StaticPicture}>
      <p>No picture</p>
    </div>
  );
}
