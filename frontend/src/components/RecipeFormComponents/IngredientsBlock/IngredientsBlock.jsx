import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import Styles from "./IngredientsBlock.module.scss";

import IngredientPair from "../../shared/IngredientPair";
import SecondaryButton from "../../shared/Buttons/SecondaryButton";
import AdditionalButton from "../../shared/Buttons/AdditionalButton";
import InputField from "../../shared/InputField";
import InputError from "../../shared/InputError";
import {
  setIngredientsArr,
  setIngredientsError,
  showIngredientFields
} from "../../../redux/actions";

const createRenderer = render => ({ input, placeholder }) => (
  <div>{render(input, placeholder)}</div>
);

const renderInput = createRenderer((input, placeholder) => (
  <InputField input={input} placeholder={placeholder} />
));

let IngredientsBlock = ({
  ingredientValue,
  quantityValue,
  clearFields,
  ingredientsArr,
  ingredientsError,
  showIngredientFields,
  setIngredients,
  setError,
  hideError,
  hideFields,
  showFields,
  toggleShowFields
}) => {
  const addIngredients = () => {
    hideError();

    if (
      !ingredientValue ||
      ingredientValue === "" ||
      !quantityValue ||
      quantityValue === ""
    ) {
      setError("Enter ingredient and quantity. Then press 'Add'");
      return;
    }

    const newIngredientPair = {
      ingredient: ingredientValue,
      quantity: quantityValue,
      id: uuidv4()
    };

    setIngredients([...ingredientsArr, newIngredientPair]);

    hideFields();

    clearFields("create-recipe-form", false, false, "ingredient", "quantity");

    return ingredientsArr;
  };

  const deleteIngredient = id => {
    const filteredIngredients = ingredientsArr.filter(
      ingredPair => ingredPair.id !== id
    );

    setIngredients(filteredIngredients);
  };

  useEffect(() => {
    if (ingredientsArr.length === 0) {
      showFields();
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
            onClick={() => toggleShowFields(!showIngredientFields)}
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

const mapStateToProps = state => {
  const {
    ingredientsArr,
    ingredientsError,
    showIngredientFields
  } = state.formValues;
  return { ingredientsArr, ingredientsError, showIngredientFields };
};

const mapDispatchToProps = dispatch => ({
  setIngredients: ingrArr => {
    dispatch(setIngredientsArr(ingrArr));
  },

  setError: errorMessage => {
    dispatch(setIngredientsError(errorMessage));
  },

  hideError: () => {
    dispatch(setIngredientsError(""));
  },

  hideFields: () => {
    dispatch(showIngredientFields(false));
  },

  showFields: () => {
    dispatch(showIngredientFields(true));
  },

  toggleShowFields: payload => {
    dispatch(showIngredientFields(payload));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(IngredientsBlock);
