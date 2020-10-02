import React, { useState, useEffect } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import Styles from "./IngredientsBlock.module.scss";

import IngredientPair from "../../shared/IngredientPair";
import SecondaryButton from "../../shared/Buttons/SecondaryButton";
import AdditionalButton from "../../shared/Buttons/AdditionalButton";
import InputField from "../../shared/InputField";
import InputError from "../../shared/InputError";

const createRenderer = render => ({ input, meta, placeholder }) => (
  <div>
    {render(input, placeholder)}
    {meta.error && meta.submitFailed && <span>{meta.error}</span>}
  </div>
);

const renderInput = createRenderer((input, placeholder) => (
  <InputField input={input} placeholder={placeholder} />
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
      quantity: quantityValue,
      id: uuidv4()
    };

    setIngredientsArr([...ingredientsArr, newIngredientPair]);

    setShowIngredientFields(false);

    clearFields("create-recipe-form", false, false, "ingredient", "quantity");

    return ingredientsArr;
  };

  const deleteIngredient = id => {
    const filteredIngredients = ingredientsArr.filter(
      ingredPair => ingredPair.id !== id
    );

    setIngredientsArr(filteredIngredients);
  };

  useEffect(() => {
    if (ingredientsArr.length === 0) {
      setShowIngredientFields(true);
    }
  }, [ingredientsArr.length]);

  return (
    <div className={Styles.IngredientsBlock}>
      <h2>INGREDIENTS:</h2>
      {ingredientsError && <InputError text={ingredientsError} />}

      {ingredientsArr.length > 0 &&
        ingredientsArr.map((ingred, index) => {
          const { ingredient, quantity, id } = ingred;

          return (
            <div className={Styles.ingridientPairContainer} key={id}>
              <IngredientPair quantity={quantity} ingredient={ingredient} />
              <AdditionalButton
                text="Delete"
                variant="close"
                onClick={() => deleteIngredient(id)}
              />
            </div>
          );
        })}

      <div className={Styles.ingridientInputsContainer}>
        {showIngredientFields && (
          <div className={Styles.ingridientInputs}>
            <Field
              name="quantity"
              component={renderInput}
              placeholder="quantity"
            />

            <Field
              name="ingredient"
              component={renderInput}
              placeholder="ingredient"
            />
            <SecondaryButton
              type="button"
              text="Add"
              onClick={addIngredients}
              pink
            />
          </div>
        )}

        {ingredientsArr.length > 0 && (
          <AdditionalButton
            variant={showIngredientFields && "close"}
            type="button"
            onClick={() => setShowIngredientFields(!showIngredientFields)}
          />
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
