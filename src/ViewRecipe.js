import React, { useEffect, useState } from "react";
import moment from "moment";
import "./ViewRecipe.css";
import Axios from "axios";
import { withRouter, Link, Redirect, useHistory } from "react-router-dom";
import { Container, Avatar } from "@material-ui/core";
import { useStateValue } from "./StateProvider";
import CommentCard from "./CommentCard";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import NewComment from "./NewComment";

function ViewRecipe(props) {
  const [{ recipe, author, comments }, dispatch] = useStateValue();
  let { name, image, duration, steps, ingredient, updatedAt } = recipe;
  const { username, profilePicture, _id } = author;
  const recipeId = props.match.params.recipeId;

  const history = useHistory();
  image =
    // "https://images.unsplash.com/photo-1597676345712-ba4536073513?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=676&q=80";
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(
        `https://foodprint-api.herokuapp.com/api/recipes/${recipeId}`
      );

      dispatch({
        type: "SET__SINGLERECIPE",
        payload: response.data,
      });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchComment() {
      const response = await Axios.get(
        `https://foodprint-api.herokuapp.com/api/recipes/${recipeId}/comments`
      );
      console.log("comment red :", response);
      dispatch({
        type: "SET__COMMENT",
        payload: response.data,
      });
    }
    fetchComment();
  }, []);

  const recipeDeleteHandler = () => {
    Axios.delete(
      `https://foodprint-api.herokuapp.com/api/recipes/${recipeId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((response) => {
        console.log(response);
        history.goBack();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loginUserId = localStorage.getItem("userId");
  return (
    <div className="viewRecipe">
      <Container style={{ border: "none" }} maxWidth="sm">
        <h1 className="viewRecipe__title">{name}</h1>
        {_id === loginUserId ? (
          <div className="viewRecipe__options">
            <Link
              to={`/new?update=true&recipeId=${recipeId}`}
              style={{
                marginRight: "20px",
                textDecoration: "none",
                color: "black",
              }}
            >
              <EditOutlinedIcon />
            </Link>
            <DeleteOutlineOutlinedIcon
              style={{ cursor: "pointer" }}
              onClick={recipeDeleteHandler}
            />
          </div>
        ) : null}
        <div className="viewRecipe__author">
          <Avatar src={profilePicture} className="viewRecipe__authorPhoto" />
          <div className="viewRecipe__authorInfo">
            <h5>{username}</h5>
            <span style={{ color: "lightgrey" }}>Posted on :</span>{" "}
            {moment(updatedAt).fromNow()}
          </div>
        </div>

        <img className="viewRecipe__image" src={image} alt="recipe image" />

        <div className="viewRecipe__description">
          <span>Duration :</span>
          <p>{duration}</p>
          <span>Ingredients :</span>
          <p>{ingredient} </p>
          <span>Steps :</span>
          <p>{steps}</p>
        </div>

        <hr />

        <div className="viewRecipe__comment">
          <strong>Comments</strong>

          <NewComment type="add" />
        </div>
        <hr />

        {comments.length > 0 ? (
          <div>
            {comments.map((comment, index) => (
              <CommentCard
                recipeId={recipeId}
                userComment={comment}
                key={index}
              />
            ))}
          </div>
        ) : (
          <p>No comments found</p>
        )}
      </Container>
    </div>
  );
}

export default withRouter(ViewRecipe);
