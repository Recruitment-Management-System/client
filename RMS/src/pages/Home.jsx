import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden flex w-full">
      <div className="w-1/6 bg-[#222831]">
        <Navbar />
      </div>
      <div
        className="w-5/6"
        style={{
          backgroundImage: `url('/src/assets/bgimg.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="h-full overflow-hidden">
          <h1 className=" text-5xl font-bold text-center pt-10">
            Recruit Management System
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Home;
