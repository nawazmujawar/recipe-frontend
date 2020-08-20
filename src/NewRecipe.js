import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NewRecipe.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddIcon from "@material-ui/icons/Add";
import { Container, TextField, Button } from "@material-ui/core";
import Axios from "axios";
import { useStateValue } from "./StateProvider";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: "100%",
      height: "100%",
    },
  },
}));

export default function NewRecipe() {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);

  const recipeNameHandler = (event) => {
    setName(event.target.value);
  };

  const recipeDurationHandler = (event) => {
    setDuration(event.target.value);
  };

  let ingredient;
  const recipeIngredientsHandler = (event) => {
    ingredient = event.target.value;
  };

  const addIngredient = () => {
    setIngredients([...ingredients, [ingredient]]);
  };

  const recipeStepsHandler = (event) => {
    setSteps(event.target.value);
  };

  const recipeImageHandler = (event) => {
    setImage(event.target.files);
  };

  const SubmitHandler = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("duration", duration);
    formData.append("ingredient", ingredients);
    formData.append("steps", steps);
    formData.append("image", image[0]);

    Axios.post("https://foodprint-api.herokuapp.com/api/recipes", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        "content-type": "multipart/form-data",
      },
    })
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };
  const classes = useStyles();

  return (
    <div className="newRecipe">
      <Container maxWidth="md">
        <div className={classes.root}>
          <Paper component="form" elevation={3} className="newRecipe__paper">
            <Link to="/home">
              <img
                className="newRecipe__logo"
                src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
                alt="app logo"
              />
            </Link>

            <p> Post your creative recipes here.</p>

            <div className="newRecipe__inputFields">
              <TextField
                style={{
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
                id="recipeName"
                label="RecipeName"
                variant="outlined"
                onChange={recipeNameHandler}
              />
              <TextField
                style={{
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
                type="number"
                id="recipeDuration"
                label="Duration in minutes"
                variant="outlined"
                onChange={recipeDurationHandler}
              />
              <div className="newRecipe__ingredients">
                <TextField
                  style={{ flex: 0.8 }}
                  id="recipeIngredients"
                  label="Ingredients"
                  variant="outlined"
                  onChange={recipeIngredientsHandler}
                />

                <AddIcon
                  onClick={addIngredient}
                  style={{ flex: 0.2, margin: "0" }}
                />
              </div>

              <TextField
                style={{
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
                id="recipeSteps"
                label="Procedure of recipes"
                multiline
                rows={6}
                variant="outlined"
                onChange={recipeStepsHandler}
              />
            </div>
            <span>
              Upload Image
              <input
                onChange={recipeImageHandler}
                accept="image/x-png,image/gif,image/jpeg"
                type="file"
                title="Upload Image"
              />
            </span>

            <Button
              variant="contained"
              style={{
                marginTop: "20px",
                color: "white",
                backgroundColor: "#e63d3d",
              }}
              onClick={SubmitHandler}
            >
              Submit
            </Button>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
