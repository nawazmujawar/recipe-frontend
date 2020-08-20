import React from "react";
import Header from "./Header";
import NewRecipe from "./NewRecipe";
import Footer from "./Footer";

function PostRecipe() {
  return (
    <div className="postRecipe">
      <Header />
      <NewRecipe />
      <Footer />
    </div>
  );
}

export default PostRecipe;
