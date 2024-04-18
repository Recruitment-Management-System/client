import React from "react";
import { Link } from "react-router-dom";

const PmNavbar = () => {
  return (
    <div>
      <div>
        <ul className="ml-5 pt-16 flex flex-col gap-5">
          <li className="text-xl hover:text-blue-500 duration-300">
            <Link to="/api/project_manager/projects">View Projects</Link>
          </li>
         
        </ul>
      </div>
      <div className="absolute bottom-5 left-5">
        <Link
          className="hover:text-red-500 text-lg duration-300"
          to={"/api/logout"}
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default PmNavbar;
