import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./NewRecipe.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Container, TextField, Button } from "@material-ui/core";
import Axios from "axios";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";
import ProgressBar from "./ProgressBar";
import CircularProgressWithLabel from "@material-ui/core/CircularProgress";

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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
      onUploadProgress: (progressEvent) => {
        setIsUploading(true);
        setUploadProgress(
          Math.round((progressEvent.loaded / progressEvent.total) * 100)
        );
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
          <Paper component="form" elevation={0} className="newRecipe__paper">
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
                required
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
                required
                onChange={recipeDurationHandler}
              />
              <div className="newRecipe__ingredients">
                <TextField
                  style={{ flex: 1 }}
                  id="recipeIngredients"
                  label="Ingredients"
                  variant="outlined"
                  onChange={recipeIngredientsHandler}
                />
                <AddCircleIcon
                  onClick={addIngredient}
                  style={{
                    flex: 0.1,
                    cursor: "pointer",
                  }}
                />
              </div>
              <p>click on add button(for adding multiple ingredients) </p>

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
                required
                onChange={recipeStepsHandler}
              />
            </div>
            <span>
              Upload Image *
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
            <ProgressBar value={uploadProgress} />
            <div style={{ paddingTop: "20px" }}>
              <a
                href="/home"
                style={{ textDecoration: "none", paddingLeft: "20px" }}
              >
                <ArrowBackIosRoundedIcon />
                Home
              </a>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
}
