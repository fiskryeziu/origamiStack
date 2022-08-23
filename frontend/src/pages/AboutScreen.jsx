import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

const AboutScreen = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center w-full h-[50vh] md:h-[60vh] relative bg-about bg-cover bg-center bg-no-repeat">
        <div className="z-10 flex items-center h-[200px]">
          <h1 className="text-white z-10 text-center text-4xl">About</h1>
        </div>
        <div className="bg-black opacity-70 absolute w-full h-full top-0"></div>
      </div>
      <Footer />
    </>
  );
};

export default AboutScreen;
