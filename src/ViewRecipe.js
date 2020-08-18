import React, { useState, useEffect } from "react";
import Axios from "axios";
import { withRouter } from "react-router-dom";

function ViewRecipe(props) {
  console.log("props", props);
  const [recipe, setRecipe] = useState();
  const recipeId = props.match.params.recipeId;
  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get(
        `https://foodprint-api.herokuapp.com/api/recipes/${recipeId}`
      );
      setRecipe(response.data);
    }
    fetchData();
  }, []);
  return <div>{JSON.stringify(recipe)}</div>;
}

export default withRouter(ViewRecipe);
