import React from "react";

const HrPerson = () => {
  return (
    <div className="h-screen overflow-hidden flex w-full">
      <div
        className="w-full"
        style={{
          backgroundImage: `url('/src/assets/bg.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // backgroundPosition: "center",
        }}
      >
        <div className="h-full overflow-hidden">
          <h1 className=" text-5xl font-bold text-center pt-10">
            HR DASHBOARD
          </h1>
        </div>
      </div>
    </div>
  );
};

export default HrPerson;
