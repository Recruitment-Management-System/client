import React from "react";

const Home = () => {
  return (
    <div className="h-screen overflow-hidden flex w-full">
      <div
        className="w-full"
        style={{
          backgroundImage: `url('/src/assets/bgimg.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
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
