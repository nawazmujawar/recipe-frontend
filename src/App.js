import React from "react";

import "./App.css";
import Login from "./Login";
import Homepage from "./Homepage";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ViewSingleRecipe from "./ViewSingleRecipe";
import PostRecipe from "./PostRecipe";

export const appHistory = createBrowserHistory();

function App() {
  return (
    <Router history={appHistory}>
      <div className="app">
        <Switch>
          <ProtectedRoute path="/home/:recipeId" component={ViewSingleRecipe} />
          <ProtectedRoute path="/new" component={PostRecipe} />
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
