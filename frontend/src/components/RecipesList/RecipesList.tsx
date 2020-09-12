import React, { ReactElement } from "react";

import Styles from "./RecipesList.module.scss";
import Recipe from "./Recipe/Recipe";
import Layout from "../Layout";
import cakeImg from "../../assets/img/cake.jpg";

export default function RecipesList(): ReactElement {
  const recipes = [
    {
      name: "Cake",
      ingridients: [
        { ingredient: "butter", quantity: "50gr" },
        { ingredient: "milk", quantity: "100ml" }
      ],
      time: "1h",
      portionsNumber: 8,
      steps: [
        "step one explanation",
        "step two explanation",
        "step three explanation"
      ],
      img: cakeImg
    },
    {
      name: "Cake",
      ingridients: [
        { ingredient: "butter", quantity: "50gr" },
        { ingredient: "milk", quantity: "100ml" }
      ],
      time: "1h",
      portionsNumber: 8,
      steps: [
        "step one explanation",
        "step two explanation",
        "step three explanation"
      ],
      img: cakeImg
    }
  ];

  return (
    <Layout buttonText="Create recipe">
      <div className={Styles.RecipesList}>
        {recipes.map((recipe, index) => {
          const { img, time, name } = recipe;
          return (
            <Recipe
              key={index}
              name={name}
              time={time}
              imgSrc={img}
              id={index}
            />
          );
        })}
      </div>
    </Layout>
  );
}
