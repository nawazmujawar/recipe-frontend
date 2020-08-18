import React from "react";

import "./App.css";
import Login from "./Login";
import Header from "./Header";
import Homepage from "./Homepage";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ViewRecipe from "./ViewRecipe";

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          {/* <Route path="/home/:recipeId">
            <ViewRecipe />
          </Route> */}
          <ProtectedRoute path="/home/:recipeId" component={ViewRecipe} />
          <ProtectedRoute path="/home" component={Homepage} />
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
