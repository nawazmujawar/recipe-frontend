import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import "./NewRecipe.css";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Container, TextField, Button, Chip } from "@material-ui/core";
import Axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";
import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

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

function NewRecipe(props) {
  const update = props.location.search.split("=")[1];
  const recipeId = props.location.search.split("=")[2];
  const [name, setName] = useState("");
  //const [editName, setEditName] = useState("");
  const [duration, setDuration] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [image, setImage] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUpdateForm, setIsUpdateForm] = useState();
  const [isDisableButton, setIsDisableButton] = useState(true);

  useEffect(() => {
    setIsUpdateForm(update);
    const getRecipe = () => {
      Axios.get(`https://foodprint-api.herokuapp.com/api/recipes/${recipeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "multipart/form-data",
        },
      }).then((response) => {
        setName(response.data.name);
        setDuration(response.data.duration);
        setSteps(response.data.steps);
        setIngredients(response.data.ingredient);
        setIsDisableButton(false);
      });
    };
    if (update) {
      getRecipe();
    }
  }, []);

  /*   useEffect(() => {
    console.log("update:", isUpdateForm);
  }, []); */

  const recipeNameHandler = (event) => {
    setName(event.target.value);
  };

  const recipeDurationHandler = (event) => {
    setDuration(event.target.value);
  };

  const recipeIngredientsHandler = (event) => {
    setIngredients(event.target.value);
  };

  const recipeStepsHandler = (event) => {
    setSteps(event.target.value);
  };

  const recipeImageHandler = (event) => {
    setImage(event.target.files);
  };

  /*  if (isUpdateForm) {
    getRecipe();
    console.log("Recipe got", recipe);
  } */
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
      .then((response) => {
        console.log(response);
      })
      .catch((error) => console.log(error));
  };

  const uploadHandler = () => {
    setIsUploading(true);
    Axios.patch(
      `https://foodprint-api.herokuapp.com/api/recipes/${recipeId}`,
      { name, duration, ingredient: ingredients, steps },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        onUploadProgress: (progressEvent) => {
          setUploadProgress(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      }
    )
      .then((response) => {
        if (response.status === 200) {
          setIsDisableButton(false);
          setIsUploading(false);
        }
      })
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
            <p style={{ color: "red" }}>
              All fields are required.(image also) *{" "}
            </p>
            <div className="newRecipe__inputFields">
              <TextField
                style={{
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
                value={name}
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
                value={duration}
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
                  value={ingredients}
                  id="recipeIngredients"
                  label="Ingredients"
                  variant="outlined"
                  onChange={recipeIngredientsHandler}
                />
              </div>

              <TextField
                style={{
                  width: "100%",
                  marginTop: "15px",
                  marginBottom: "15px",
                }}
                value={steps}
                id="recipeSteps"
                label="Procedure of recipes"
                multiline
                rows={6}
                variant="outlined"
                required
                onChange={recipeStepsHandler}
              />
            </div>
            {update ? null : (
              <span>
                Upload Image *
                <input
                  onChange={recipeImageHandler}
                  accept="image/x-png,image/gif,image/jpeg"
                  type="file"
                  title="Upload Image"
                />
              </span>
            )}

            {isUpdateForm ? (
              isUploading ? (
                <React.Fragment>
                  <p>Updating your post {uploadProgress} %</p>
                  <CircularProgress value={uploadProgress} />
                </React.Fragment>
              ) : (
                <Button
                  variant="contained"
                  style={{
                    marginTop: "20px",
                    color: "white",
                    backgroundColor: "#e63d3d",
                  }}
                  disabled={isDisableButton}
                  onClick={uploadHandler}
                >
                  Update
                </Button>
              )
            ) : isUploading ? (
              <React.Fragment>
                <p>Creating your post {uploadProgress} %</p>
                <CircularProgress value={uploadProgress} />
              </React.Fragment>
            ) : (
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
            )}

            <div style={{ paddingTop: "20px" }}>
              <Link
                to="/home"
                style={{ textDecoration: "none", paddingLeft: "20px" }}
              >
                <ArrowBackIosRoundedIcon />
                Home
              </Link>
            </div>
          </Paper>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(NewRecipe);
