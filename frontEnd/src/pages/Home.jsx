import React from "react";
import Navbar from "../components/Navbar";
import Posts from "../components/Posts";
import { Footer } from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div>
        <Posts />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
