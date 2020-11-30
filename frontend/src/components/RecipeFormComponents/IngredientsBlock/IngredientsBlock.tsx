import React, { useEffect, Dispatch, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

import Styles from "./IngredientsBlock.module.scss";

import IngredientPair from "../../shared/IngredientPair";
import SecondaryButton from "../../shared/Buttons/SecondaryButton";
import AdditionalButton from "../../shared/Buttons/AdditionalButton";
import InputError from "../../shared/InputError";

import {
  Field,
  reduxForm,
  formValueSelector,
  InjectedFormProps,
  change
} from "redux-form";
import { connect, useSelector, useDispatch } from "react-redux";
import {
  setIngredientsArr,
  setIngredientsErrorMessage,
  showIngredientFields,
  closeIngredientFields,
  toggleIngredientFields,
  IAction
} from "../../../redux/actions";
import { IAppState } from "../../../redux/store";
import { ingredientsType } from "../../../types";
import { renderInput } from "../renderBlockInput/renderBlockInput";

interface ownPropsType {
  ingredientValue: string;
  quantityValue: string;
}

let IngredientsBlock: React.FC<InjectedFormProps & ownPropsType> = ({
  ingredientValue,
  quantityValue
}) => {
  const ingredientsArr: Array<ingredientsType> = useSelector(
    (state: IAppState) => state.formValues.ingredientsArr
  );
  const ingredientsError = useSelector(
    (state: IAppState) => state.formValues.ingredientsError
  );
  const showIngredients = useSelector(
    (state: IAppState) => state.formValues.showIngredientFields
  );

  const dispatch: Dispatch<IAction> = useDispatch();

  const clearField = useCallback(
    (field: string) => dispatch(change("create-recipe-form", field, "")),
    [dispatch]
  );

  const addIngredients = () => {
    dispatch(setIngredientsErrorMessage(""));

    if (
      !ingredientValue ||
      ingredientValue === "" ||
      !quantityValue ||
      quantityValue === ""
    ) {
      dispatch(
        setIngredientsErrorMessage(
          "Enter ingredient and quantity. Then press 'Add'"
        )
      );
      return;
    }

    const newIngredientPair = {
      ingredient: ingredientValue,
      quantity: quantityValue,
      id: uuidv4()
    };

    dispatch(setIngredientsArr([...ingredientsArr, newIngredientPair]));
    dispatch(closeIngredientFields());

    clearField("ingredient");
    clearField("quantity");

    return ingredientsArr;
  };

  const deleteIngredient = (id: string | undefined) => {
    const filteredIngredients = ingredientsArr.filter(
      ingredPair => ingredPair.id !== id
    );

    dispatch(setIngredientsArr(filteredIngredients));
  };

  const handleToggleClick = () => {
    dispatch(toggleIngredientFields());

    dispatch(setIngredientsErrorMessage(""));
  };

  const ingArrLength = ingredientsArr.length;

  useEffect(() => {
    if (ingArrLength === 0) {
      dispatch(showIngredientFields());
    }
  }, [ingArrLength]);

  return (
    <div className={Styles.IngredientsBlock}>
      <h2>INGREDIENTS:</h2>

      {ingArrLength > 0 &&
        ingredientsArr.map((ingred, index) => {
          const { ingredient, quantity, id } = ingred;

          return (
            <div
              className={Styles.ingridientPairContainer}
              key={id}
              data-cy={`ingredient-pair-${index}`}
            >
              <IngredientPair quantity={quantity} ingredient={ingredient} />
              <AdditionalButton
                variant="close"
                onClick={() => deleteIngredient(id)}
                dataCy={`delete-ingredient-pair-${index}`}
              />
            </div>
          );
        })}
      <div>
        {ingredientsError && <InputError text={ingredientsError} />}
        <div className={Styles.ingridientInputsContainer}>
          {showIngredients && (
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
                dataCy="add-ingredient"
              />
            </div>
          )}

          {ingArrLength > 0 && (
            <AdditionalButton
              variant={showIngredients ? "close" : ""}
              type="button"
              onClick={handleToggleClick}
              dataCy="toggle-new-inputs"
            />
          )}
        </div>
      </div>
    </div>
  );
};

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

export default IngredientsBlock = connect(
  reduxForm({ form: "create-recipe-form" })
)(IngredientsBlock);
