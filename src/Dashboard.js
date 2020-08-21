import React, { useEffect, useState } from "react";

import "./Dashboard.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typewriter from "typewriter-effect";
import Container from "@material-ui/core/Container";
import { facts } from "./foodfact";
import Axios from "axios";
import RecipeCard from "./RecipeCard";
import { Grid, Button } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import CreateIcon from "@material-ui/icons/Create";
import { useStateValue } from "./StateProvider";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import IsLoading from "./IsLoading";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "60%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  gridContainer: {
    paddingTop: "50px",
  },
  gridItem: {
    marginLeft: "auto",
    marginRight: "auto",
  },
  recipeCard: {
    padding: theme.spacing(2),
    textAlign: "center",
  },
  searchTextField: {
    backgroundColor: "white",
    width: "70% !important",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function Dashboard() {
  const [{ recipes }, dispatch] = useStateValue();

  const [nameRecipe, setNameRecipe] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isBack, setIsBack] = useState(false);

  const classes = useStyles();

  const searchHandler = async () => {
    const response = await Axios.get(
      `https://foodprint-api.herokuapp.com/api/recipes?search=${nameRecipe}`
    );
    const searchedRecipes = response;
    console.log("asdasd :", searchedRecipes);
    setIsBack(true);
    dispatch({
      type: "SET__SEARCH",
      recipes: searchedRecipes,
    });
  };

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(
        "https://foodprint-api.herokuapp.com/api/recipes"
      );
      const allRecipes = response.data.recipes;
      console.log("all recipe :", allRecipes);
      setIsLoading(false);
      dispatch({
        type: "SET__RECIPES",
        recipes: allRecipes,
      });
    }

    fetchData();
  }, []);

  return (
    <div className="dashboard">
      {isBack ? (
        <div style={{ paddingTop: "20px" }}>
          <a
            href="/home"
            style={{ textDecoration: "none", paddingLeft: "20px" }}
          >
            <ArrowBackIosRoundedIcon />
            Back
          </a>
          <hr />
        </div>
      ) : (
        <div className="dashboard__header">
          <Paper className={classes.root}>
            <InputBase
              className={classes.input}
              value={nameRecipe}
              onChange={(e) => {
                setNameRecipe(e.target.value);
              }}
              placeholder="Search recipes here..."
              inputProps={{ "aria-label": "search recipe", type: "search" }}
            />
            <IconButton
              type="submit"
              onClick={searchHandler}
              className={classes.iconButton}
              aria-label="search"
            >
              {nameRecipe ? <SearchIcon /> : null}
            </IconButton>
          </Paper>

          <Typewriter
            className="dashboard__facts"
            options={{
              strings: facts,
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "15vh",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <p
          style={{
            color: "black",
            fontWeight: "bold",
            marginTop: "20px",
            textAlign: "center",
          }}
        >
          Create and store your recipes.
        </p>
        <Link to="/new" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            style={{
              color: "#e63d3d",
              fontWeight: "bolder ",
              borderColor: "#e63d3d",
              marginBottom: "20px",
            }}
          >
            <CreateIcon />
            Post Recipe
          </Button>
        </Link>
      </div>

      <hr />
      {isLoading ? (
        <IsLoading />
      ) : recipes.length > 0 ? (
        <Container style={{ maxWidth: "80%" }}>
          <Grid container spacing={4} className={classes.gridContainer}>
            {recipes.map((recipe, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                className={classes.gridItem}
                key={index}
              >
                <RecipeCard className={classes.recipeCard} recipe={recipe} />
              </Grid>
            ))}
          </Grid>
        </Container>
      ) : (
        <h5 style={{ textAlign: "center", height: "100vh" }}>
          recipe not found...!
        </h5>
      )}
    </div>
  );
}

export default Dashboard;
