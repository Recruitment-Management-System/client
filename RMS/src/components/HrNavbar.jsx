import React from "react";
import { Link } from "react-router-dom";

const HrNavbar = () => {
  return (
    <div>
      HrNavbar
      <div className="absolute bottom-5 left-5">
        <Link to={"/api/logout"}>Logout</Link>
      </div>
    </div>
  );
};

export default HrNavbar;
