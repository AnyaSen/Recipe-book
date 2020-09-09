import React from "react";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router";

import RecipesList from "./components/RecipesList";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={RecipesList} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
