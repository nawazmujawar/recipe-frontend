import React from "react";
import Header from "./Header";
import ViewRecipe from "./ViewRecipe";
import Footer from "./Footer";

function ViewSingleRecipe(props) {
  console.log("Props from View", props);
  return (
    <div className="viewSingleRecipe">
      <Header />
      <ViewRecipe history={props.history} />
      <Footer />
    </div>
  );
}

export default ViewSingleRecipe;
