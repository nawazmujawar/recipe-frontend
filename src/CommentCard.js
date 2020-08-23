import React from "react";
import { appHistory } from "./App";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    marginBottom: "10px",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const { comment, user, _id } = props.userComment;
  const { recipeId } = props;

  const classes = useStyles();
  const loginUserId = localStorage.getItem("userId");

  const commentDeleteHandler = () => {
    Axios.delete(
      `https://foodprint-api.herokuapp.com/api/recipes/${recipeId}/comments/${_id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    )
      .then((response) => {
        appHistory.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Card id={`comment-${_id}`} className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={user.profilePicture}
            aria-label="recipe"
            className={classes.avatar}
          />
        }
        title={user.username}
        subheader="Date"
      />

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {comment}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        {_id === loginUserId ? (
          <IconButton aria-label="delete" onClick={commentDeleteHandler}>
            <DeleteIcon />
          </IconButton>
        ) : null}
      </CardActions>
    </Card>
  );
}
