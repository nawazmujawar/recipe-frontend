import React, { useState, useEffect } from "react";
import { withRouter, useHistory } from "react-router-dom";
import ChatOutlinedIcon from "@material-ui/icons/ChatOutlined";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { appHistory } from "./App";
import Axios from "axios";

function NewComment(props) {
  const [comment, setComment] = useState("");
  const [open, setOpen] = useState(false);


  const recipeID = props.match.params.recipeId;
  const loginUserId = localStorage.getItem("userId");

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const commentHandler = (event) => {
    setComment({ comment: event.target.value });
  };

  const commentSubmitHandler = () => {


    Axios.post(
      `https://foodprint-api.herokuapp.com/api/recipes/${recipeID}/comments`,
      comment,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "content-type": "application/json",
        },
      }
    )
      .then((response) => {
        setOpen(false);
        appHistory.go(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <ChatOutlinedIcon
        onClick={handleClickOpen}
        style={{ cursor: "pointer" }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          Add comment
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Give feedback, response and compliments to this creative recipe.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter comment"
            type="email"
            fullWidth
            onChange={commentHandler}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={commentSubmitHandler} color="primary">
            Comment
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default withRouter(NewComment);
