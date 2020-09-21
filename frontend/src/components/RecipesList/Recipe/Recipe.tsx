import React, { ReactElement } from "react";

import Styles from "./Recipe.module.scss";
import { Link } from "react-router-dom";
import StaticPicture from "../../shared/StaticPicture";

interface Props {
  name: string;
  id: number;
  imgSrc?: string | undefined;
  time?: string;
}
export default function Recipe({
  name,
  time,
  imgSrc,
  id
}: Props): ReactElement {
  return (
    <Link to={`/recipe/${id}`} className={Styles.Recipe}>
      {imgSrc ? <img src={imgSrc} alt={name} /> : <StaticPicture />}
      <h2>{name}</h2>
      <p>{time}</p>
    </Link>
  );
}
