import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";
import Footer from "./Footer";

function Homepage() {
  return (
    <div className="homepage">
      <Header />
      <Dashboard />
      <Footer />
    </div>
  );
}

export default Homepage;
