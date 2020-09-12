import React from "react";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router";

import RecipesList from "./components/RecipesList";
import RecipePage from "./components/RecipePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={RecipesList} />
        <Route exact path="/recipe/:id" component={RecipePage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
