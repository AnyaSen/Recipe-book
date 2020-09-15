import React, { ReactElement } from "react";

import Styles from "./Recipe.module.scss";
import { Link } from "react-router-dom";

interface Props {
  name: string;
  id: number;
  imgSrc: string | undefined;
  time?: string;
}
export default function Recipe({
  name,
  time,
  imgSrc,
  id
}: Props): ReactElement {
  return (
    <Link to={`/recipe/${name.toLowerCase()}`} className={Styles.Recipe}>
      <img src={imgSrc} alt={name} />
      <h2>{name}</h2>
      <p>{time}</p>
    </Link>
  );
}
