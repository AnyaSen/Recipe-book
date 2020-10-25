import React, { ReactElement, ReactNode } from "react";

import Styles from "./StaticPicture.module.scss";

interface Props {
  horizontal?: boolean;
  addPicture?: boolean;
  children?: ReactNode;
  text: string;
}
export default function StaticPicture({
  horizontal,
  addPicture,
  children,
  text
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
      <p>{text}</p>
    </div>
  );
}
