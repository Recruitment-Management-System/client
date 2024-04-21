import React from "react";
import { Link } from "react-router-dom";

const UserNavbar = () => {
  return (
    <div className="flex flex-col text-center">
      <Link
        to={"/api/register"}
        className="bg-black hover:bg-slate-900 duration-200 rounded-md py-3 my-3 mx-5 cursor-pointer"
      >
        Register
      </Link>
      <Link
        to={"/api/login"}
        className="bg-black hover:bg-slate-900 duration-200 rounded-md py-3 my-3 mx-5 cursor-pointer"
      >
        Login
      </Link>
    </div>
  );
};

export default UserNavbar;
