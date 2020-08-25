import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,

    marginLeft: "auto",
    marginRight: "auto",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard({ recipe }) {
  const classes = useStyles();
  let { _id, user, name, image, steps, updatedAt } = recipe;
  const showDescription = steps.slice(0, 150);
  image =
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80";

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar
            src={user.profilePicture}
            aria-label="recipe"
            className={classes.avatar}
          />
        }
        title={user.username}
        subheader={moment(updatedAt).fromNow()}
      />
      <CardMedia className={classes.media} image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {showDescription}...
        </Typography>
      </CardContent>

      <CardActions>
        {/* <Button size="small" color="primary">
          Share
        </Button> */}
        <Link to={`/home/${_id}`} style={{ textDecoration: "none" }}>
          <Button size="small" style={{ color: "#e63d3d" }}>
            View Recipe
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
