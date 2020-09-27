import React, { useState } from "react";
import Styles from "./FormPage.module.scss";

import { Field, reduxForm, formValueSelector } from "redux-form";
import { connect } from "react-redux";

import Layout from "../../components/Layout";
import StaticPicture from "../../components/shared/StaticPicture";
import Button from "../../components/shared/Button";

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(2000);
  window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
};

const required = value => {
  if (!value || value === "") {
    return "This field is required";
  }
};

const createRenderer = render => ({ input, meta, placeholder }) => (
  <div>
    {render(input, placeholder)}
    {meta.error && meta.submitFailed && <span>{meta.error}</span>}
  </div>
);

const renderInput = createRenderer((input, placeholder) => (
  <input {...input} placeholder={placeholder} />
));

const renderTextArea = createRenderer(input => <textarea {...input} />);

let FormPage = ({
  handleSubmit,
  submitting,
  ingredientValue,
  quantityValue,
  clearFields
}) => {
  const [ingredientsArr, setIngredientsArr] = useState([]);
  const [ingredientsError, setIngredientsError] = useState("");

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

    clearFields("create-recipe-form", false, false, "ingredient", "quantity");

    return ingredientsArr;
  };

  return (
    <Layout buttonText="Back to all" withLink linkTo="/" withButton>
      <form onSubmit={handleSubmit}>
        <div className={Styles.FormHeader}>
          <div className={Styles.nameAndPicture}>
            <Field
              name="name"
              component={renderInput}
              validate={required}
              placeholder="Name"
            />

            <StaticPicture horizontal />
            <div className="labels">
              <Field
                name="time"
                component={renderInput}
                validate={required}
                placeholder="Time"
              />

              <Field
                name="portionsNumber"
                component={renderInput}
                validate={required}
                placeholder="Portions"
              />
            </div>
          </div>
          <div className={Styles.ingridients}>
            <h2>Ingredients:</h2>
            {ingredientsError && <p>{ingredientsError}</p>}

            <div className={Styles.ingridientPairs}>
              {ingredientsArr.map((ingred, index) => {
                const { ingredient, quantity } = ingred;
                return (
                  <div key={index}>
                    <p>{ingredient}</p>
                    <p>{quantity}</p>
                  </div>
                );
              })}

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
              <button type="button">x</button>
            </div>
          </div>
        </div>
        <div className={Styles.RecipeInfo}>
          <h2>Preparation:</h2>
          <div className={Styles.preparation}>
            <div>
              <h3>Step 1</h3>
              <Field
                name="step"
                component={renderTextArea}
                type="text"
                validate={required}
              />
              <button type="button">Add</button>
              <button type="button">x</button>
            </div>
          </div>
          <Button text="Submit" type="submit" disabled={submitting} />
        </div>
      </form>
    </Layout>
  );
};

FormPage = reduxForm({
  form: "create-recipe-form",
  onSubmit
})(FormPage);

const selector = formValueSelector("create-recipe-form");
FormPage = connect(state => {
  const ingredientValue = selector(state, "ingredient");
  const quantityValue = selector(state, "quantity");

  return {
    ingredientValue,
    quantityValue
  };
})(FormPage);

export default FormPage;
