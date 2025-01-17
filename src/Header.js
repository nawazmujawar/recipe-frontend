import React from "react";
import { Link, Redirect } from "react-router-dom";
import "./Header.css";
import LogoutIcon from "@material-ui/icons/ExitToApp";
function Header() {
  const logoutHandler = () => {
    localStorage.clear();
    return <Redirect to="/" />;
  };
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light  fixed-top "
      style={{
        backgroundColor: "white",
        boxShadow: "0 4px 12px 0 rgba(0, 0, 0, 0.05)",
      }}
    >
      <Link className="navbar-brand" to="/home">
        FoodCluster
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNavAltMarkup"
        style={{ fontWeight: "bold" }}
      >
        <div className="navbar-nav ml-auto">
          <Link className="nav-link " to="/new">
            Create Recipe
          </Link>
          <Link className="nav-link" to="/myRecipes">
            My Recipes
          </Link>
          <Link className="nav-link" to="/" onClick={logoutHandler}>
            {localStorage.getItem("username")}
            <LogoutIcon className="header__logoutLogo" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Header;
