import React from "react";
import "./App.scss";

import { Switch, Route, Redirect } from "react-router";

import RecipePage from "./pages/RecipePage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/recipe/:id" component={RecipePage} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;
