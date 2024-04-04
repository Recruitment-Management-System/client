import { jwtDecode } from "jwt-decode";
import React from "react";
import AdminNavbar from "./AdminNavbar";
import InterviewerNavbar from "./InterviewerNavbar";
import PmNavbar from "./PmNavbar";
import HrNavbar from "./HrNavbar";
import Logout from "./Logout";
import { Link } from "react-router-dom";
import UserNavbar from "./UserNavbar";

const Navbar = () => {
  const token = localStorage.getItem("token");
  let navbarComponent = <UserNavbar />;

  if (token) {
    const decodeToken = jwtDecode(token);
    const role = decodeToken.role;

    switch (role) {
      case "ADMIN":
        navbarComponent = <AdminNavbar />;
        break;
      case "INTERVIEWER":
        navbarComponent = <InterviewerNavbar />;
        break;
      case "PROJECT_MANAGER":
        navbarComponent = <PmNavbar />;
        break;
      case "HR_PERSON":
        navbarComponent = <HrNavbar />;
        break;

      default:
        break;
    }
  }
  return (
    <div className="text-white font-bold">
      {navbarComponent}
      <div className="absolute bottom-5 left-5">
        <Link to={"/"}>Logout</Link>
      </div>
    </div>
  );
};

export default Navbar;
