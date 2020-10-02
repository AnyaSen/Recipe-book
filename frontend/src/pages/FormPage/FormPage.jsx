import React from "react";
import RecipeForm from "../../components/RecipeForm/RecipeForm";

export default function FormPage() {
  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async values => {
    await sleep(2000);
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
  };

  return <RecipeForm onSubmit={onSubmit} />;
}
