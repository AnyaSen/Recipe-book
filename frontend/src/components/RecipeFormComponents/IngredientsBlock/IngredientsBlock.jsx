import React, { useState } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { required } from "../../../services/validation";

import Styles from "./IngredientsBlock.module.scss";

import IngredientPair from "../../shared/IngredientPair";

const createRenderer = render => ({ input, meta, placeholder }) => (
  <div>
    {render(input, placeholder)}
    {meta.error && meta.submitFailed && <span>{meta.error}</span>}
  </div>
);

const renderInput = createRenderer((input, placeholder) => (
  <input {...input} placeholder={placeholder} />
));

let IngredientsBlock = ({ ingredientValue, quantityValue, clearFields }) => {
  const [ingredientsArr, setIngredientsArr] = useState([]);
  const [ingredientsError, setIngredientsError] = useState("");
  const [showIngredientFields, setShowIngredientFields] = useState(true);

  const addIngredients = () => {
    setIngredientsError("");

    if (
      !ingredientValue ||
      ingredientValue === "" ||
      !quantityValue ||
      quantityValue === ""
    ) {
      setIngredientsError("Fill the ingredient and its quantity");
      return;
    }

    const newIngredientPair = {
      ingredient: ingredientValue,
      quantity: quantityValue
    };

    setIngredientsArr([...ingredientsArr, newIngredientPair]);

    setShowIngredientFields(false);

    clearFields("create-recipe-form", false, false, "ingredient", "quantity");

    return ingredientsArr;
  };

  return (
    <div className={Styles.ingridients}>
      <h2>INGREDIENTS:</h2>
      {ingredientsError && <p>{ingredientsError}</p>}

      {ingredientsArr.map((ingred, index) => {
        const { ingredient, quantity } = ingred;
        return (
          <IngredientPair
            key={index}
            quantity={ingredient}
            ingredient={quantity}
          />
        );
      })}

      <div className={Styles.ingridientInputsContainer}>
        {showIngredientFields && (
          <div className={Styles.ingridientInputs}>
            <Field
              name="ingredient"
              component={renderInput}
              validate={required}
              placeholder="ingredient"
            />

            <Field
              name="quantity"
              component={renderInput}
              validate={required}
              placeholder="qty"
            />
            <button type="button" onClick={addIngredients}>
              Add
            </button>
          </div>
        )}

        {ingredientsArr.length > 0 && (
          <button
            type="button"
            onClick={() => setShowIngredientFields(!showIngredientFields)}
          >
            {showIngredientFields ? "x" : "+"}
          </button>
        )}
      </div>
    </div>
  );
};

IngredientsBlock = reduxForm({
  form: "create-recipe-form"
})(IngredientsBlock);

const selector = formValueSelector("create-recipe-form");
IngredientsBlock = connect(state => {
  const ingredientValue = selector(state, "ingredient");
  const quantityValue = selector(state, "quantity");
  const stepValue = selector(state, "step");

  return {
    ingredientValue,
    quantityValue,
    stepValue
  };
})(IngredientsBlock);

export default IngredientsBlock;
