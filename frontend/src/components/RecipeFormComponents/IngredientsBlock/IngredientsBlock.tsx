import React, { useEffect, Dispatch } from "react";
import { v4 as uuidv4 } from "uuid";

import {
  Field,
  reduxForm,
  formValueSelector,
  InjectedFormProps
} from "redux-form";
import { connect } from "react-redux";
import { compose } from "redux";

import {
  setIngredientsArr,
  setIngredientsErrorMessage,
  showIngredientFields,
  closeIngredientFields,
  toggleIngredientFields,
  IAction
} from "../../../redux/actions";
import { IAppState } from "../../../redux/store";
import { createRendererType } from "../../../types";
import { ingredientsType } from "../../../types";
import { MapStatePropsType, ownPropsType } from "./types";

import Styles from "./IngredientsBlock.module.scss";

import IngredientPair from "../../shared/IngredientPair";
import SecondaryButton from "../../shared/Buttons/SecondaryButton";
import AdditionalButton from "../../shared/Buttons/AdditionalButton";
import InputField from "../../shared/InputField";
import InputError from "../../shared/InputError";

const createRenderer: createRendererType = render => ({
  input,
  placeholder
}) => <div>{render(input, placeholder)}</div>;

const renderInput = createRenderer(
  (input: React.Component | React.FC, placeholder: string) => (
    <InputField input={input} placeholder={placeholder} />
  )
);

let IngredientsBlock: React.FC<InjectedFormProps &
  MapStatePropsType &
  ownPropsType> = ({
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

  const deleteIngredient = (id: string | undefined) => {
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
        ingredientsArr.map(ingred => {
          const { ingredient, quantity, id } = ingred;

          return (
            <div className={Styles.ingridientPairContainer} key={id}>
              <IngredientPair quantity={quantity} ingredient={ingredient} />
              <AdditionalButton
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
            variant={showIngredientFields ? "close" : ""}
            type="button"
            onClick={() => toggleShowFields()}
          />
        )}
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

const mapStateToProps = (state: IAppState): MapStatePropsType => {
  const {
    ingredientsArr,
    ingredientsError,
    showIngredientFields
  } = state.formValues;
  return { ingredientsArr, ingredientsError, showIngredientFields };
};

const mapDispatchToProps = (dispatch: Dispatch<IAction>) => ({
  setIngredients: (ingrArr: Array<ingredientsType>) => {
    dispatch(setIngredientsArr(ingrArr));
  },

  setError: (errorMessage: string) => {
    dispatch(setIngredientsErrorMessage(errorMessage));
  },

  hideError: () => {
    dispatch(setIngredientsErrorMessage(""));
  },

  hideFields: () => {
    dispatch(closeIngredientFields());
  },

  showFields: () => {
    dispatch(showIngredientFields());
  },

  toggleShowFields: () => {
    dispatch(toggleIngredientFields());
  }
});

export default compose(
  reduxForm({
    form: "create-recipe-form"
  }),
  connect(mapStateToProps, mapDispatchToProps)
)(IngredientsBlock);

// const connected = compose(
//   reduxForm({
//     form: "create-recipe-form"
//   }),
//   connect(mapStateToProps, mapDispatchToProps)
// )(IngredientsBlock);

// export { connected as IngredientsBlock }

// IngredientsBlock = reduxForm({
//   form: "create-recipe-form"
// })(IngredientsBlock);
// export default connect(mapStateToProps, mapDispatchToProps)(IngredientsBlock);
