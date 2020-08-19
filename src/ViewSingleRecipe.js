import React from "react";
import Header from "./Header";
import ViewRecipe from "./ViewRecipe";
import Footer from "./Footer";

function ViewSingleRecipe() {
  return (
    <div className="viewSingleRecipe">
      <Header />
      <ViewRecipe />
      <Footer />
    </div>
  );
}

export default ViewSingleRecipe;
