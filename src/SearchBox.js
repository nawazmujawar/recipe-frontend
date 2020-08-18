/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";
import { useStateValue } from "./StateProvider";

const useStyle = makeStyles((theme) => ({
  
}));

export default function FreeSolo() {
  const [{ recipes }, dispatch] = useStateValue();
  const classes = useStyle();

  // console.log(recipeNames);
  return (
    <div style={{ width: "70%" }}>
      <TextField
        className={classes.searchTextField}
        value={recipes.name}
        onChange={(e) => {
          dispatch({
            type: "SET__onSEARCHRECIPE",
            recipes: e.target.value,
          });
        }}
        // label="Search input"
        placeholder="Search recipe"
        margin="normal"
        variant="outlined"
        InputProps={{ type: "search" }}
      />
    </div>
  );
}
