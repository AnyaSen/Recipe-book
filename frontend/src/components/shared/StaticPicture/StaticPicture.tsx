import React, { ReactElement, ReactNode } from "react";

import Styles from "./StaticPicture.module.scss";

interface Props {
  horizontal?: boolean;
  addPicture?: boolean;
  children?: ReactNode;
}
export default function StaticPicture({
  horizontal,
  addPicture,
  children
}: Props): ReactElement {
  if (addPicture) {
    return <div className={Styles.AddPicture}>{children}</div>;
  }

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
