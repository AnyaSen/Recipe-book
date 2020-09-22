import React, { ReactElement } from "react";

import Styles from "./StaticPicture.module.scss";

interface Props {
  horizontal?: boolean;
}
export default function StaticPicture({ horizontal }: Props): ReactElement {
  return (
    <div
      className={
        horizontal ? Styles.StaticPictureHorizontal : Styles.StaticPicture
      }
    >
      <p>No picture</p>
    </div>
  );
}
